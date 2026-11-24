'use strict';

importScripts('api-contract.js');

const LEGAL_VERSION = '1.0';
const API_BASE = `${self.evgMedsContract.SITE_URL}/api/meds`;
const EVENT_URL = self.evgMedsContract.EVENT_URL;
const WAITLIST_URL = self.evgMedsContract.WAITLIST_URL;
const EXTENSION_ID = self.evgMedsContract.EXTENSION_ID;

const ANON_ID_KEY = 'evigrade_meds_anon_id';
const SESSION_ID_KEY = 'evigrade_meds_session_id';
const TIER_CACHE_KEY = 'evg_meds_tier_cache';
const OPTOUT_KEY = 'evg_meds_telemetry_optout';
const QUEUE_KEY = 'evg_meds_event_queue';
const HEARTBEAT_DAY_KEY = 'evg_meds_heartbeat_day';
const HEARTBEAT_ALARM = 'evg-meds-heartbeat';
const LOOKUP_CACHE_KEY = 'evg_meds_lookup_cache';
const LOOKUP_CACHE_TTL_MS = 7 * 24 * 60 * 60 * 1000; // 7 days
const LOOKUP_CACHE_MAX = 200;

const ALLOWED_EVENT_TYPES = self.evgMedsContract.EXTENSION_EVENT_TYPES;
const EVENT_MIN_INTERVAL_MS = 2000;
const lastSentAt = new Map();

const lookupInflight = new Map();

/**
 * Telemetry reliability, rewritten 2026-07-30. Same three fixes as the Skin
 * extension: a `channel` flag that separates Web Store installs from our own
 * unpacked dev builds, a retry queue so a failed POST is replayed instead of
 * lost, and a once-a-day HEARTBEAT so an idle install stays visible. Over
 * 27 June – 26 July the Web Store counted 37 installs of Meds and the table
 * stored 4.
 */
const FALLBACK_EVENT_URL = 'https://evigrade.vercel.app/api/extension/event';
const PROD_EXTENSION_ID = 'anmacpbhhffljikchkcdcbajiopanjei';
const QUEUE_MAX = 100;
// Per-request cap for telemetry POSTs, see postTo().
const POST_TIMEOUT_MS = 15000;

const CHANNEL = (() => {
  try {
    return chrome.runtime.id === PROD_EXTENSION_ID ? 'store' : 'dev';
  } catch {
    return 'unknown';
  }
})();

const SESSION_ID = (() => {
  try {
    return self.crypto.randomUUID();
  } catch {
    return randomId();
  }
})();

function randomId() {
  if (self.crypto?.randomUUID) return self.crypto.randomUUID();
  const bytes = new Uint8Array(16);
  self.crypto.getRandomValues(bytes);
  return [...bytes].map((b) => b.toString(16).padStart(2, '0')).join('');
}

async function getAnonymousId() {
  const data = await chrome.storage.local.get(ANON_ID_KEY);
  let id = data[ANON_ID_KEY];
  if (!id || typeof id !== 'string' || id.length > 64) {
    id = randomId();
    await chrome.storage.local.set({ [ANON_ID_KEY]: id });
  }
  return id;
}

async function getCachedTier() {
  try {
    const data = await chrome.storage.local.get(TIER_CACHE_KEY);
    const tier = data?.[TIER_CACHE_KEY];
    if (self.evgMedsContract.SUBSCRIPTION_TIERS.has(tier)) return tier;
  } catch {}
  return 'FREE';
}

async function isOptedOut() {
  try {
    const data = await chrome.storage.local.get(OPTOUT_KEY);
    return data?.[OPTOUT_KEY] === true;
  } catch {}
  return false;
}

function sanitizeExtra(type, extra) {
  if (!extra || typeof extra !== 'object') return {};
  const out = {};

  if (typeof extra.store === 'string') {
    const store = extra.store.slice(0, 30).replace(/[^a-z0-9_-]/gi, '');
    if (self.evgMedsContract.EXTENSION_STORES.has(store)) out.store = store;
  }

  for (const key of ['matchedCount', 'totalCount', 'unknownCount']) {
    const v = extra[key];
    if (typeof v === 'number' && Number.isFinite(v)) {
      out[key] = Math.max(0, Math.min(500, Math.floor(v)));
    }
  }

  if (typeof extra.target === 'string') {
    const target = extra.target.slice(0, 100).replace(/[^a-z0-9_:\-./]/gi, '');
    if (target) out.target = target;
  }

  if (type === 'ERROR') {
    if (typeof extra.errorCode === 'string') {
      out.errorCode = extra.errorCode.slice(0, 64).replace(/[^a-z0-9_\-:.]/gi, '');
    }
    if (typeof extra.comment === 'string') {
      out.comment = extra.comment.slice(0, 2000);
    }
  }

  return out;
}

// One POST attempt. A non-2xx counts as a loss exactly like a thrown fetch:
// both mean the event is not in the table, and both belong in the queue.
async function postTo(url, payload) {
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
    keepalive: true,
    credentials: 'omit',
    referrer: '',
    mode: 'cors',
    // A hung request would hold the queue lock below for as long as the
    // worker lives, and every event behind it would die with the worker.
    signal: AbortSignal.timeout(POST_TIMEOUT_MS),
  });
  return res.ok;
}

// Primary host first, direct-to-Vercel second. The fallback skips Cloudflare,
// so a proxy-side block still gets the event through and `via` records it.
async function deliver(payload) {
  try {
    if (await postTo(EVENT_URL, { ...payload, via: 'com' })) return true;
  } catch {}
  try {
    if (await postTo(FALLBACK_EVENT_URL, { ...payload, via: 'vercel' })) return true;
  } catch {}
  return false;
}

async function readQueue() {
  try {
    const data = await chrome.storage.local.get(QUEUE_KEY);
    const q = data?.[QUEUE_KEY];
    return Array.isArray(q) ? q : [];
  } catch {
    return [];
  }
}

async function writeQueue(queue) {
  try {
    await chrome.storage.local.set({ [QUEUE_KEY]: queue.slice(-QUEUE_MAX) });
  } catch {}
}

// Every read-modify-write of the queue goes through this one chain. Without
// it, two wake-ups at once (cold start + hourly alarm) replayed the same event
// twice, and two failed sends at once overwrote each other in storage, losing
// one of them. On 12 October 2026 the table held 37 such doubles from Meds.
let queueChain = Promise.resolve();

function withQueueLock(fn) {
  const run = queueChain.then(fn);
  queueChain = run.catch(() => {});
  return run;
}

// Replay oldest first, stop at the first failure. No point burning the whole
// backlog against a dead network, and cohort math needs install before use.
// The queue is saved after every delivered event, so a worker killed halfway
// does not resend on the next wake what already landed.
function flushQueue() {
  return withQueueLock(async () => {
    if (await isOptedOut()) {
      await writeQueue([]);
      return;
    }
    const queue = await readQueue();
    while (queue.length) {
      const ok = await deliver(queue[0]);
      if (!ok) break;
      queue.shift();
      await writeQueue(queue);
    }
  });
}

async function sendEvent(type, extra = {}) {
  if (!ALLOWED_EVENT_TYPES.has(type)) return;
  if (await isOptedOut()) return;

  const now = Date.now();
  const last = lastSentAt.get(type) || 0;
  if (now - last < EVENT_MIN_INTERVAL_MS) return;
  lastSentAt.set(type, now);

  let payload;
  try {
    const [anonymousId, tier] = await Promise.all([getAnonymousId(), getCachedTier()]);
    payload = {
      type,
      extension: EXTENSION_ID,
      version: chrome.runtime.getManifest().version,
      anonymousId,
      sessionId: SESSION_ID,
      locale: chrome.i18n.getUILanguage(),
      tier,
      channel: CHANNEL,
      at: new Date(now).toISOString(),
      ...sanitizeExtra(type, extra),
    };
  } catch {
    return;
  }

  const ok = await deliver(payload);
  if (!ok) {
    await enqueue(payload);
    return;
  }
  await flushQueue();
}

function enqueue(payload) {
  return withQueueLock(async () => {
    const queue = await readQueue();
    queue.push(payload);
    await writeQueue(queue);
  });
}

// One HEARTBEAT per calendar day. The alarm ticks hourly: a 24-hour period
// silently skips anyone who does not keep the browser open long enough.
async function maybeHeartbeat() {
  try {
    if (await isOptedOut()) return;
    const today = new Date().toISOString().slice(0, 10);
    const data = await chrome.storage.local.get(HEARTBEAT_DAY_KEY);
    if (data?.[HEARTBEAT_DAY_KEY] === today) return;
    await chrome.storage.local.set({ [HEARTBEAT_DAY_KEY]: today });
    await sendEvent('HEARTBEAT');
  } catch {}
}

function ensureHeartbeatAlarm() {
  try {
    chrome.alarms.create(HEARTBEAT_ALARM, { periodInMinutes: 60 });
  } catch {}
}

async function sendWaitlist(payload) {
  if (await isOptedOut()) return { ok: false, reason: 'opted_out' };

  const email = String(payload?.email || '').trim().toLowerCase();
  const feature = String(payload?.feature || '').slice(0, 64).replace(/[^a-z0-9_\-]/gi, '');
  if (!/^[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}$/i.test(email)) {
    return { ok: false, reason: 'invalid_email' };
  }
  if (!feature) return { ok: false, reason: 'missing_feature' };

  try {
    const [anonymousId, tier] = await Promise.all([getAnonymousId(), getCachedTier()]);
    const locale = chrome.i18n.getUILanguage();
    const res = await fetch(WAITLIST_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email,
        feature,
        extension: EXTENSION_ID,
        anonymousId,
        sessionId: SESSION_ID,
        tier,
        locale,
      }),
      credentials: 'omit',
      referrer: '',
      mode: 'cors',
    });
    if (!res.ok) return { ok: false, reason: 'upstream_error', status: res.status };
    await sendEvent('WAITLIST_EMAIL_SUBMITTED', { target: feature });
    return { ok: true };
  } catch (e) {
    return { ok: false, reason: 'network_error' };
  }
}

async function setUninstallUrl() {
  try {
    const anonymousId = await getAnonymousId();
    let lang = 'en';
    try {
      lang = (chrome.i18n.getUILanguage() || '').startsWith('ru') ? 'ru' : 'en';
    } catch {}
    const url = `${self.evgMedsContract.SITE_URL}/${lang}/meds/uninstall?aid=${encodeURIComponent(anonymousId)}&v=${encodeURIComponent(chrome.runtime.getManifest().version)}`;
    await chrome.runtime.setUninstallURL(url);
  } catch {}
}

try {
  if (chrome.storage?.session) {
    chrome.storage.session.set({ [SESSION_ID_KEY]: SESSION_ID });
  }
} catch {}

function lookupCacheKey(title, locale) {
  const norm = (title || '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-zа-я0-9]+/gi, '')
    .slice(0, 200);
  return `${locale || 'en'}::${norm}`;
}

async function readLookupCache(key) {
  try {
    const data = await chrome.storage.local.get(LOOKUP_CACHE_KEY);
    const store = data?.[LOOKUP_CACHE_KEY] || {};
    const hit = store[key];
    if (!hit) return null;
    if (Date.now() - hit.ts > LOOKUP_CACHE_TTL_MS) return null;
    // Legacy entries written by <=v0.4.11 cached only `match`.
    // Synthesize `matches` from the single match so multi-tab UI works
    // on cache hits without forcing a refetch.
    const matches = Array.isArray(hit.matches)
      ? hit.matches
      : (hit.match ? [hit.match] : []);
    return { match: hit.match ?? null, matches };
  } catch (e) {
    return null;
  }
}

async function writeLookupCache(key, match, matches) {
  try {
    const data = await chrome.storage.local.get(LOOKUP_CACHE_KEY);
    const store = data?.[LOOKUP_CACHE_KEY] || {};
    store[key] = { match, matches, ts: Date.now() };

    // Cap at LOOKUP_CACHE_MAX entries by dropping the oldest. Cheap LRU
    // since we re-write the whole map anyway. Keeps chrome.storage.local
    // well below quotas even for power users (10MB hard cap per extension).
    const keys = Object.keys(store);
    if (keys.length > LOOKUP_CACHE_MAX) {
      keys
        .map(k => ({ k, ts: store[k].ts }))
        .sort((a, b) => a.ts - b.ts)
        .slice(0, keys.length - LOOKUP_CACHE_MAX)
        .forEach(({ k }) => delete store[k]);
    }
    await chrome.storage.local.set({ [LOOKUP_CACHE_KEY]: store });
  } catch (e) {
    // best effort
  }
}

async function lookupRemote(productTitle, locale) {
  const cacheKey = lookupCacheKey(productTitle, locale);

  const cached = await readLookupCache(cacheKey);
  // Positive hit only. Null/empty matches always refetch — new SearchSynonym
  // rows on the server should surface within the page session, not after a
  // 7-day TTL.
  if (cached && cached.match) {
    return { match: cached.match, matches: cached.matches, source: 'cache' };
  }

  // Coalesce concurrent identical lookups (same product, same locale)
  // to one network call. Avoids double-fetch when detector re-fires on
  // SPA navigation within the same product page.
  if (lookupInflight.has(cacheKey)) {
    return lookupInflight.get(cacheKey);
  }

  const inflight = (async () => {
    try {
      const url = `${API_BASE}/lookup?q=${encodeURIComponent(productTitle)}&locale=${encodeURIComponent(locale || 'en')}`;
      const res = await fetch(url, { credentials: 'omit' });
      if (!res.ok) {
        return { match: null, matches: [], source: 'remote' };
      }
      const json = await res.json();
      const matches = Array.isArray(json?.matches) && json.matches.length
        ? json.matches
        : (json?.match ? [json.match] : []);
      const match = json?.match || matches[0] || null;
      await writeLookupCache(cacheKey, match, matches);
      return { match, matches, source: 'remote' };
    } catch (e) {
      return { match: null, matches: [], source: 'remote' };
    } finally {
      lookupInflight.delete(cacheKey);
    }
  })();

  lookupInflight.set(cacheKey, inflight);
  return inflight;
}

async function isLegalAccepted() {
  try {
    const stored = await chrome.storage.sync.get(['legalAcceptedAt', 'legalVersion']);
    return Boolean(stored.legalAcceptedAt) && stored.legalVersion === LEGAL_VERSION;
  } catch (e) {
    return false;
  }
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  const type = message?.type;

  if (type === 'TRACK') {
    sendEvent(message.event, message.extra || {});
    sendResponse({ ok: true });
    return false;
  }

  if (type === 'WAITLIST_SUBMIT') {
    sendWaitlist(message.payload || {}).then(result => sendResponse(result));
    return true;
  }

  if (type === 'LOOKUP') {
    (async () => {
      if (!(await isLegalAccepted())) {
        sendResponse({ match: null, blocked: 'legal_not_accepted' });
        return;
      }
      const { title, locale, store } = message.payload || {};
      if (!title) {
        sendResponse({ match: null });
        return;
      }
      const { match, matches, source } = await lookupRemote(title, locale);
      const matchedCount = Array.isArray(matches) ? matches.length : (match ? 1 : 0);
      sendEvent('SCAN', { store, matchedCount, totalCount: matchedCount || 1 });
      if (match) {
        sendEvent('MATCH_FOUND', { target: match.slug, store });
      } else {
        sendEvent('NO_MATCH', { store });
      }
      sendResponse({ match, matches: matches || [], source });
    })();
    return true;
  }

  return false;
});

chrome.runtime.onInstalled.addListener(async (details) => {
  await setUninstallUrl();
  ensureHeartbeatAlarm();
  if (details.reason === 'install') {
    chrome.tabs.create({ url: chrome.runtime.getURL('welcome.html') });
    await sendEvent('INSTALL');
    // INSTALL already proves the install is alive today, so no extra ping.
    try {
      await chrome.storage.local.set({ [HEARTBEAT_DAY_KEY]: new Date().toISOString().slice(0, 10) });
    } catch {}
    return;
  }
  if (details.reason === 'update') {
    await sendEvent('UPDATE');
    const stored = await chrome.storage.sync.get(['legalVersion']);
    if (stored.legalVersion !== LEGAL_VERSION) {
      chrome.tabs.create({ url: chrome.runtime.getURL('welcome.html') });
    }
  }
});

chrome.runtime.onStartup.addListener(async () => {
  await setUninstallUrl();
  ensureHeartbeatAlarm();
  await flushQueue();
  await maybeHeartbeat();
});

chrome.alarms.onAlarm.addListener(async (alarm) => {
  if (alarm.name !== HEARTBEAT_ALARM) return;
  await flushQueue();
  await maybeHeartbeat();
});

// Any cold start of the worker is also a chance to drain the backlog.
ensureHeartbeatAlarm();
flushQueue();
