const LEGAL_VERSION = '1.0';

function track(event, extra) {
  try {
    chrome.runtime.sendMessage({ type: 'TRACK', event, extra: extra || {} });
  } catch {}
}

const POPUP_I18N = {
  en: {
    title: 'Evigrade Meds',
    subtitle: 'Educational reference',
    disclaimer: 'Educational reference only. Not medical advice. Consult a healthcare professional.',
    scanning: 'Scanning page…',
    notFound: 'No medication or supplement identified on this page.',
    notFoundHint: 'Open a product page on iHerb, Amazon, Vitamin Shoppe, an ES parafarmacia (Atida, Mifarma, Promofarma, Dosfarma, Druni) or a RU online pharmacy (Apteka.ru, EApteka, Zdravsity, Wildberries, Ozon).',
    reportLabel: 'Side effect',
    settingsLabel: 'Settings',
    terms: 'Terms',
    privacy: 'Privacy',
    sources: 'Sources',
    matchPrefix: 'Reference for:',
    openCard: 'Open full reference',
    healthPregnancy: 'Pregnancy',
    healthLactation: 'Breastfeeding'
  },
  es: {
    title: 'Evigrade Meds',
    subtitle: 'Referencia educativa',
    disclaimer: 'Solo referencia educativa. No es consejo médico. Consulte a un profesional sanitario.',
    scanning: 'Analizando página…',
    notFound: 'No se ha identificado ningún medicamento o complemento en esta página.',
    notFoundHint: 'Abra una ficha de producto en iHerb, Amazon, Vitamin Shoppe, una parafarmacia ES (Atida, Mifarma, Promofarma, Dosfarma, Druni) o una farmacia RU online (Apteka.ru, EApteka, Zdravsity, Wildberries, Ozon).',
    reportLabel: 'Efecto adverso',
    settingsLabel: 'Ajustes',
    terms: 'Términos',
    privacy: 'Privacidad',
    sources: 'Fuentes',
    matchPrefix: 'Referencia para:',
    openCard: 'Abrir referencia completa',
    healthPregnancy: 'Embarazo',
    healthLactation: 'Lactancia'
  },
  ru: {
    title: 'Evigrade Meds',
    subtitle: 'Справочник',
    disclaimer: 'Только справочная информация. Не заменяет консультацию врача.',
    scanning: 'Сканируем страницу…',
    notFound: 'На этой странице не распознан препарат или БАД.',
    notFoundHint: 'Откройте карточку товара на iHerb, Amazon, Vitamin Shoppe, в испанской парафармации (Atida, Mifarma, Promofarma, Dosfarma, Druni) или в российской аптеке (Apteka.ru, EApteka, Zdravsity, Wildberries, Ozon).',
    reportLabel: 'Побочное действие',
    settingsLabel: 'Настройки',
    terms: 'Условия',
    privacy: 'Конфиденциальность',
    sources: 'Источники',
    matchPrefix: 'Справка по:',
    openCard: 'Открыть полную карточку',
    healthPregnancy: 'Беременность',
    healthLactation: 'Лактация'
  }
};

const adverseReportingLinks = {
  US: { url: 'https://www.fda.gov/safety/medwatch-fda-safety-information-and-adverse-event-reporting-program' },
  EU: { url: 'https://www.adrreports.eu/' },
  ES: { url: 'https://www.notificaram.es/' },
  UK: { url: 'https://yellowcard.mhra.gov.uk/' },
  RU: { url: 'https://roszdravnadzor.gov.ru/services/lawreact' }
};

async function ensureLegalAccepted() {
  const stored = await chrome.storage.sync.get(['legalAcceptedAt', 'legalVersion']);
  if (!stored.legalAcceptedAt || stored.legalVersion !== LEGAL_VERSION) {
    chrome.tabs.create({ url: chrome.runtime.getURL('welcome.html') });
    window.close();
    return false;
  }
  return true;
}

// Locale resolution order, mirrors content/detector.js:
//   1. Stored manual choice from settings.html (chrome.storage.sync.language).
//   2. Active tab host (ES retailers → es, RU retailers → ru, etc.).
//   3. Chrome UI language / navigator.language.
const POPUP_HOST_TO_LOCALE = [
  [/(^|\.)amazon\.es$/i, 'es'],
  [/(^|\.)mifarma\.es$/i, 'es'],
  [/(^|\.)atida\.com$/i, 'es'],
  [/(^|\.)promofarma\.com$/i, 'es'],
  [/(^|\.)dosfarma\.com$/i, 'es'],
  [/(^|\.)druni\.es$/i, 'es'],
  [/(^|\.)apteka\.ru$/i, 'ru'],
  [/(^|\.)eapteka\.ru$/i, 'ru'],
  [/(^|\.)zdravcity\.ru$/i, 'ru'],
  [/(^|\.)wildberries\.(ru|am|by|kz|uz|kg)$/i, 'ru'],
  [/(^|\.)ozon\.(ru|com)$/i, 'ru'],
  [/(^|\.)amazon\.co\.uk$/i, 'en'],
  [/(^|\.)amazon\.de$/i, 'en'],
  [/(^|\.)vitaminshoppe\.com$/i, 'en'],
];

async function detectLocale() {
  try {
    const { language } = await chrome.storage.sync.get(['language']);
    if (language === 'ru' || language === 'en' || language === 'es') return language;
  } catch {}
  try {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    if (tab?.url) {
      const host = new URL(tab.url).hostname;
      for (const [pattern, locale] of POPUP_HOST_TO_LOCALE) {
        if (pattern.test(host)) return locale;
      }
    }
  } catch {}
  const uiLang = (chrome.i18n.getUILanguage() || navigator.language || 'en').toLowerCase();
  if (uiLang.startsWith('ru')) return 'ru';
  if (uiLang.startsWith('es')) return 'es';
  return 'en';
}

function pickReportingRegion() {
  const uiLang = (chrome.i18n.getUILanguage() || navigator.language || 'en').toLowerCase();
  if (uiLang.startsWith('ru')) return 'RU';
  if (uiLang.startsWith('es')) return 'ES';
  if (uiLang.startsWith('en-gb')) return 'UK';
  if (uiLang.startsWith('en')) return 'US';
  return 'EU';
}

async function applyLocale() {
  const locale = await detectLocale();
  const t = POPUP_I18N[locale];
  document.documentElement.lang = locale;
  document.getElementById('popupTitle').textContent = t.title;
  document.getElementById('popupSubtitle').textContent = t.subtitle;
  document.getElementById('quickDisclaimer').textContent = t.disclaimer;
  document.getElementById('scanningText').textContent = t.scanning;
  document.getElementById('notFoundText').textContent = t.notFound;
  document.getElementById('notFoundHint').textContent = t.notFoundHint;
  document.getElementById('reportAdverseLabel').textContent = t.reportLabel;
  document.getElementById('settingsLabel').textContent = t.settingsLabel;
  document.getElementById('footerTermsLink').textContent = t.terms;
  document.getElementById('footerPrivacyLink').textContent = t.privacy;
  document.getElementById('footerSourcesLink').textContent = t.sources;
  // EN-доки идут без суффикса (terms.html), RU/ES — с локалью (terms.ru.html).
  const docSuffix = locale === 'en' ? '' : `.${locale}`;
  document.getElementById('footerTermsLink').setAttribute('href', `terms${docSuffix}.html`);
  document.getElementById('footerPrivacyLink').setAttribute('href', `privacy${docSuffix}.html`);
  document.getElementById('footerSourcesLink').setAttribute('href', `about${docSuffix}.html`);
  const pregLabel = document.getElementById('healthPregnancyLabel');
  const lactLabel = document.getElementById('healthLactationLabel');
  if (pregLabel) pregLabel.textContent = t.healthPregnancy;
  if (lactLabel) lactLabel.textContent = t.healthLactation;
  return { locale, t };
}

// ============================================================
// HEALTH PROFILE (pregnancy / lactation)
// ============================================================
// chrome.storage.local — special category data per GDPR Art. 9.
// Do not sync to Google account servers, keep device-local. Same
// key the content overlay reads from, so any toggle here propagates
// to the floating panel on the next render.

const HEALTH_PROFILE_KEY = 'healthProfile';
const HEALTH_PROFILE_SYNC_KEY = 'healthProfileSynced';
const HEALTH_PROFILE_URL = globalThis.evgMedsContract?.HEALTH_PROFILE_URL
  || 'https://www.evigrade.com/api/meds/health-profile';
const healthProfile = { pregnancy: false, lactation: false };

// Cross-device sync via /api/meds/health-profile. Only logged-in users
// get a serverside row (401 means anonymous → keep working locally).
// Network or 5xx falls back silently to chrome.storage.local; we never
// surface sync errors in the popup, the toggles must stay snappy.

async function fetchHealthProfileFromServer() {
  try {
    const res = await fetch(HEALTH_PROFILE_URL, { credentials: 'include' });
    if (res.status === 401) return { authenticated: false };
    if (!res.ok) return null;
    const json = await res.json();
    const p = json?.profile;
    if (!p) return { authenticated: true, profile: null };
    return {
      authenticated: true,
      profile: {
        pregnancy: Boolean(p.pregnancy),
        lactation: Boolean(p.lactation),
      },
    };
  } catch {
    return null;
  }
}

async function pushHealthProfileToServer(next) {
  try {
    await fetch(HEALTH_PROFILE_URL, {
      method: 'PUT',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        pregnancy: Boolean(next.pregnancy),
        lactation: Boolean(next.lactation),
      }),
    });
  } catch {
    // best-effort; local copy is the source of truth on failure
  }
}

async function loadHealthProfile() {
  // 1. Read local first so the UI paints instantly with the last known state.
  try {
    const data = await chrome.storage.local.get(HEALTH_PROFILE_KEY);
    const stored = data?.[HEALTH_PROFILE_KEY];
    if (stored && typeof stored === 'object') {
      healthProfile.pregnancy = Boolean(stored.pregnancy);
      healthProfile.lactation = Boolean(stored.lactation);
    }
  } catch {}
  refreshHealthButtons();

  // 2. In the background, ask the server. If the user is logged in and
  // the server row differs from local, server wins and we mirror it
  // back to local (server is the cross-device source of truth).
  const remote = await fetchHealthProfileFromServer();
  if (!remote || !remote.authenticated) return;

  // Has this device ever pushed a profile to the server? We need this to
  // tell apart "first time syncing, local is the source" from "server has
  // intentionally null, user cleared their profile on evigrade.com and we
  // must mirror that deletion locally".
  let everSynced = false;
  try {
    const syncRecord = await chrome.storage.local.get(HEALTH_PROFILE_SYNC_KEY);
    everSynced = Boolean(syncRecord?.[HEALTH_PROFILE_SYNC_KEY]);
  } catch {}

  if (!remote.profile) {
    if (everSynced) {
      // We had a server row before, now it's gone — the user removed
      // health data on evigrade.com. Clear locally so the overlay stops
      // showing pregnancy/lactation flags the user thinks they erased.
      if (healthProfile.pregnancy || healthProfile.lactation) {
        healthProfile.pregnancy = false;
        healthProfile.lactation = false;
        refreshHealthButtons();
        await saveHealthProfile();
        try {
          const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
          if (tab?.id) chrome.tabs.sendMessage(tab.id, { action: 'healthProfileChanged' });
        } catch {}
      }
      return;
    }
    // First sync for this account — seed the server with what we have
    // locally so we don't lose a freshly-toggled local profile.
    await pushHealthProfileToServer(healthProfile);
    try {
      await chrome.storage.local.set({ [HEALTH_PROFILE_SYNC_KEY]: true });
    } catch {}
    return;
  }

  // Remember that we have a real server row from now on.
  try {
    await chrome.storage.local.set({ [HEALTH_PROFILE_SYNC_KEY]: true });
  } catch {}

  const changed =
    remote.profile.pregnancy !== healthProfile.pregnancy
    || remote.profile.lactation !== healthProfile.lactation;
  if (!changed) return;
  healthProfile.pregnancy = remote.profile.pregnancy;
  healthProfile.lactation = remote.profile.lactation;
  refreshHealthButtons();
  await saveHealthProfile();
  try {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    if (tab?.id) chrome.tabs.sendMessage(tab.id, { action: 'healthProfileChanged' });
  } catch {}
}

async function saveHealthProfile() {
  try {
    await chrome.storage.local.set({
      [HEALTH_PROFILE_KEY]: {
        pregnancy: healthProfile.pregnancy,
        lactation: healthProfile.lactation,
      },
    });
  } catch {}
}

function refreshHealthButtons() {
  const $preg = document.getElementById('health-pregnancy');
  const $lact = document.getElementById('health-lactation');
  if ($preg) $preg.classList.toggle('active', healthProfile.pregnancy);
  if ($lact) $lact.classList.toggle('active', healthProfile.lactation);
}

async function toggleHealthFilter(kind) {
  healthProfile[kind] = !healthProfile[kind];
  refreshHealthButtons();
  await saveHealthProfile();
  track('HEALTH_PROFILE_CHANGED', { target: `${kind}:${healthProfile[kind] ? 'on' : 'off'}` });
  // Server sync — fire-and-forget. 401 (anonymous) and network errors
  // are absorbed inside the helper, so the popup stays responsive even
  // when the user is offline or signed out.
  pushHealthProfileToServer(healthProfile);
  // Re-render the floating overlay on the active tab if it is showing.
  try {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    if (tab?.id) chrome.tabs.sendMessage(tab.id, { action: 'healthProfileChanged' });
  } catch {}
}

function showState(stateId) {
  document.querySelectorAll('.state').forEach(el => el.classList.add('hidden'));
  document.getElementById(stateId).classList.remove('hidden');
}

async function isSupportedTab() {
  try {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    if (!tab?.url) return false;
    // Список синхронизирован с manifest.json content_scripts.matches.
    return /^https?:\/\/[^/]*?(iherb\.com|amazon\.(?:com|es|co\.uk|de)|vitaminshoppe\.com|mifarma\.es|atida\.com|promofarma\.com|dosfarma\.com|druni\.es|apteka\.ru|eapteka\.ru|zdravcity\.ru|wildberries\.(?:ru|am|by|kz|uz|kg)|ozon\.(?:ru|com))\//i.test(tab.url);
  } catch (e) {
    return false;
  }
}

async function tryDetectOnActiveTab(t, locale) {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  if (!tab?.id) return false;

  try {
    const [{ result } = {}] = await chrome.scripting.executeScript({
      target: { tabId: tab.id },
      func: () => {
        const BLOCKLIST = /^(sign\s*in|log\s*in|register|sign\s*up|create\s*account|my\s*account|account|cart|basket|wishlist|search|menu|home|checkout|skip to main content|loading\.\.\.|404|page not found|not found|buscar|hola, identifícate|cesta|pedidos)$/i;
        const clean = (s) => {
          if (!s) return null;
          const t = String(s).trim().replace(/\s+/g, ' ');
          if (t.length <= 2) return null;
          if (BLOCKLIST.test(t)) return null;
          return t;
        };
        // Selector-by-selector: specific product slots first, then SSR
        // fallbacks (og:title, JSON-LD Product.name), then bare h1 last.
        const selectors = [
          '#name', '#productTitle', 'h1#title span', 'h1#title',
          'h1.product-name', 'h1[itemprop="name"]',
        ];
        for (const sel of selectors) {
          const el = document.querySelector(sel);
          const txt = clean(el?.textContent);
          if (txt) return txt;
        }
        const og = document.querySelector('meta[property="og:title"]')?.getAttribute('content');
        const ogClean = clean(og);
        if (ogClean) return ogClean;
        const ldNodes = document.querySelectorAll('script[type="application/ld+json"]');
        for (const node of ldNodes) {
          try {
            const data = JSON.parse(node.textContent || '');
            const items = Array.isArray(data) ? data : [data];
            for (const item of items) {
              if (!item || typeof item !== 'object') continue;
              const type = item['@type'];
              const isProduct = type === 'Product' || (Array.isArray(type) && type.includes('Product'));
              if (isProduct && typeof item.name === 'string') {
                const c = clean(item.name);
                if (c) return c;
              }
            }
          } catch {}
        }
        const h1 = document.querySelector('h1');
        return clean(h1?.textContent);
      }
    });

    if (!result) return false;

    const lookup = await chrome.runtime.sendMessage({
      type: 'LOOKUP',
      payload: { title: result, locale, retailer: 'popup', url: tab.url }
    });

    if (lookup?.match) {
      renderMatch(result, lookup.match, t, locale);
      return true;
    }
    showState('stateNotFound');
    document.getElementById('notFoundText').textContent = `${t.notFound}`;
    document.getElementById('notFoundHint').textContent = `"${result.slice(0, 80)}${result.length > 80 ? '…' : ''}"`;
    return true;
  } catch (e) {
    return false;
  }
}

function renderMatch(title, match, t, locale) {
  const card = document.getElementById('ingredientCard');
  card.innerHTML = '';
  const name = match.names?.[locale]?.[0] || match.names?.en?.[0] || match.slug;

  const sourceItems = (match.sources || []).slice(0, 3).map(s =>
    `<li><a href="${escapeAttr(s.url)}" target="_blank" rel="noopener">${escapeHtml(s.label)}</a></li>`
  ).join('');

  const evigradeUrl = (match.evigradeUrl || '').replace('/en/', `/${locale}/`);

  card.innerHTML = `
    <div style="font-size:11px;color:#6e6e73;text-transform:uppercase;letter-spacing:0.05em;margin-bottom:4px;">${escapeHtml(t.matchPrefix)}</div>
    <div style="font-size:15px;font-weight:600;margin-bottom:8px;">${escapeHtml(name)}</div>
    ${match.category_en ? `<div style="display:inline-block;background:#e0e7ff;color:#3730a3;padding:2px 8px;border-radius:999px;font-size:10px;font-weight:500;margin-bottom:10px;">${escapeHtml(match.category_en)}</div>` : ''}
    ${sourceItems ? `<div style="font-size:11px;color:#6e6e73;text-transform:uppercase;letter-spacing:0.05em;margin:8px 0 4px;">${escapeHtml(t.sources)}</div><ul style="list-style:none;font-size:12px;line-height:1.4;">${sourceItems}</ul>` : ''}
    ${evigradeUrl ? `<a href="${escapeAttr(evigradeUrl)}" target="_blank" rel="noopener" style="display:block;text-align:center;background:#1d1d1f;color:#fff;border-radius:8px;padding:9px;text-decoration:none;font-weight:600;font-size:12px;margin-top:12px;">${escapeHtml(t.openCard)} →</a>` : ''}
  `;
  showState('stateFound');
}

function escapeHtml(s) {
  if (s == null) return '';
  return String(s).replace(/[&<>"']/g, m => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[m]));
}

function escapeAttr(s) {
  return escapeHtml(s);
}

document.addEventListener('DOMContentLoaded', async () => {
  const accepted = await ensureLegalAccepted();
  if (!accepted) return;

  const { locale, t } = await applyLocale();
  track('POPUP_OPEN');

  showState('stateScanning');

  document.getElementById('reportAdverseBtn').addEventListener('click', () => {
    const region = pickReportingRegion();
    track('ADVERSE_REPORT_CLICK', { target: region.toLowerCase() });
    chrome.tabs.create({ url: adverseReportingLinks[region].url });
  });

  document.getElementById('settingsBtn').addEventListener('click', () => {
    chrome.runtime.openOptionsPage();
  });

  document.getElementById('health-pregnancy')?.addEventListener('click', () => toggleHealthFilter('pregnancy'));
  document.getElementById('health-lactation')?.addEventListener('click', () => toggleHealthFilter('lactation'));
  await loadHealthProfile();

  if (await isSupportedTab()) {
    const ok = await tryDetectOnActiveTab(t, locale);
    if (!ok) showState('stateNotFound');
  } else {
    showState('stateNotFound');
  }
});
