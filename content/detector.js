'use strict';

(function () {
  if (window.__evigradeMedsLoaded) return;
  window.__evigradeMedsLoaded = true;

  const LEGAL_VERSION = '1.0';
  const HOST = window.location.hostname;
  let lastUrl = location.href;
  let legalAccepted = false;

  // Common selector fallbacks used across multiple e-commerce platforms.
  // Order matters: specific selectors first, then h1 catch-all, then
  // meta og:title (works on every SPA after initial render), then
  // JSON-LD Product.name as last resort (filled by SSR even on SPAs
  // where h1 is empty during the first frame).
  const COMMON_TITLE_SELECTORS = [
    'h1[itemprop="name"]',
    'h1.product-name',
    'h1.product-title',
    'h1[data-testid*="product"]',
    'h1[data-testid*="title"]',
    '[data-testid="product-title"]',
    'h1',
    'meta[property="og:title"]',
    'script[type="application/ld+json"]'
  ];

  const RETAILERS = {
    iherb: {
      hostMatch: /iherb\.com$/i,
      urlPattern: /\/pr\/[a-z0-9-]+\/\d+/i,
      titleSelectors: [
        '#name',
        'h1#name',
        '[itemprop="name"]',
        'h1.product-name',
        'h1'
      ],
      categoryCheck: () => {
        const breadcrumbs = document.querySelectorAll('.breadcrumbs a, .breadcrumb a, nav[aria-label="breadcrumb"] a');
        const text = Array.from(breadcrumbs).map(a => (a.textContent || '').toLowerCase()).join(' ');
        return /supplement|vitamin|herb|mineral|amino|probiotic|omega|protein|sports nutrition/i.test(text) || true;
      }
    },
    amazon: {
      hostMatch: /amazon\.(com|es|co\.uk|de|fr|it)$/i,
      // Amazon has several URL layouts that all point to the same product:
      //   /dp/<ASIN>                  – canonical desktop
      //   /gp/product/<ASIN>          – legacy desktop
      //   /gp/aw/d/<ASIN>             – mobile web ("aw" = Amazon Web)
      //   /<slug>/dp/<ASIN>           – slug + ASIN
      //   /gp/aw/d/B07DLQZPJJ?...     – mobile with query
      urlPattern: /\/(dp|gp\/product|gp\/aw\/d|gp\/aw\/s\/d)\/[A-Z0-9]{10}/i,
      titleSelectors: [
        '#productTitle',
        'span#productTitle',
        'h1#title span',
        'h1#title',
        // Mobile/aw layout fallbacks – productTitle id is sometimes absent
        // on /gp/aw/d/ pages; SSR meta and JSON-LD are always present.
        'meta[property="og:title"]',
        'script[type="application/ld+json"]'
      ],
      categoryCheck: () => {
        const breadcrumb = document.querySelector('#wayfinding-breadcrumbs_feature_div, #nav-subnav');
        const text = (breadcrumb?.textContent || '').toLowerCase();
        return /health|household|supplement|vitamin|dietary|sports nutrition|salud|farmacia|parafarmacia|здоровье|витамин|аптек/i.test(text);
      }
    },
    vitaminshoppe: {
      hostMatch: /vitaminshoppe\.com$/i,
      urlPattern: /\/p\/[a-z0-9-]+\//i,
      // Specific product-page selectors first. A bare h1 fallback on
      // vitaminshoppe.com matches the "Sign In" heading inside the
      // header login modal, so we rely on JSON-LD Product.name and
      // og:title — both filled by SSR on every PDP — before any h1.
      titleSelectors: [
        'h1[data-testid*="product" i]',
        '[data-testid="product-title"]',
        '[data-testid="ProductTitle"]',
        'h1[itemprop="name"]',
        'h1.product-name',
        '.product-detail__title',
        '.pdp-title',
        'meta[property="og:title"]',
        'script[type="application/ld+json"]',
        'h1'
      ],
      categoryCheck: () => true
    },
    // ES online pharmacies and parafarmacia. Each has its own URL shape:
    //   atida    /es-es/<slug-without-id>
    //   mifarma  /es/<slug>  (rare; mostly redirects to atida.com)
    //   dosfarma /<id>-<slug>.html
    //   druni    /<slug>     (bare slug, no /p/, no .html)
    //   promofarma /<slug>   (bare slug like druni, plus old /p/<slug> URLs)
    // We deliberately accept any non-root path on these hosts and rely on
    // COMMON_TITLE_SELECTORS + og:title / JSON-LD to confirm it really is a
    // product page. A loose pattern is safer here: a stricter regex blocked
    // every PDP on atida and druni in v0.4.8.
    mifarma: {
      hostMatch: /(mifarma|atida)\.(es|com)$/i,
      urlPattern: /\/[a-z][\w-]+(\/[\w-]+)*/i,
      titleSelectors: COMMON_TITLE_SELECTORS,
      categoryCheck: () => true
    },
    promofarma: {
      hostMatch: /promofarma\.com$/i,
      urlPattern: /\/[a-z][\w-]+(\/[\w-]+)*/i,
      titleSelectors: COMMON_TITLE_SELECTORS,
      categoryCheck: () => true
    },
    dosfarma: {
      hostMatch: /dosfarma\.com$/i,
      urlPattern: /\/\d+[-\w]+\.html?/i,
      titleSelectors: COMMON_TITLE_SELECTORS,
      categoryCheck: () => true
    },
    druni: {
      hostMatch: /druni\.es$/i,
      urlPattern: /\/[a-z][\w-]+/i,
      titleSelectors: COMMON_TITLE_SELECTORS,
      categoryCheck: () => true
    },
    // RU online pharmacies and major marketplaces.
    aptekaru: {
      hostMatch: /apteka\.ru$/i,
      urlPattern: /\/product\//i,
      titleSelectors: COMMON_TITLE_SELECTORS,
      categoryCheck: () => true
    },
    eapteka: {
      hostMatch: /eapteka\.ru$/i,
      // Реальные URL карточек: /goods/id528584/, /product/<slug>, /catalog/<slug>
      urlPattern: /\/(goods\/id\d+|product\/|catalog\/)/i,
      titleSelectors: COMMON_TITLE_SELECTORS,
      categoryCheck: () => true
    },
    zdravcity: {
      // До 0.4.14 ключ и hostMatch были zdravsity (опечатка) — реальный домен zdravcity.ru.
      // URL карточек: /p_<slug>.html, иногда /product/<id>
      hostMatch: /zdravcity\.ru$/i,
      urlPattern: /\/(p_[a-z0-9_-]+\.html|product\/)/i,
      titleSelectors: COMMON_TITLE_SELECTORS,
      categoryCheck: () => true
    },
    wildberries: {
      // Региональные домены: .ru/.am/.by/.kz/.uz/.kg
      hostMatch: /wildberries\.(ru|am|by|kz|uz|kg)$/i,
      urlPattern: /\/catalog\/\d+\/detail\.aspx/i,
      titleSelectors: [
        // Wildberries ships a SPA with class-name hashes that rotate, so
        // we anchor on the stable parts. The product page title slot
        // always lives inside a "product-page__header" or under a
        // h1[class*="product-page__title"]. og:title is filled server-
        // side from the SSR pass before hydration.
        'h1.product-page__title',
        'h1[class*="product-page__title"]',
        '[class*="product-page__header"] h1',
        'meta[property="og:title"]',
        ...COMMON_TITLE_SELECTORS
      ],
      categoryCheck: () => {
        const text = document.body.textContent.toLowerCase().slice(0, 5000);
        return /препарат|таблетк|витамин|бад|капсул|сироп|раствор|порошок|саше/i.test(text);
      }
    },
    ozon: {
      // Ozon региональные домены: .ru и .com (am.ozon.com и т.п.)
      hostMatch: /ozon\.(ru|com)$/i,
      urlPattern: /\/product\/[a-z0-9-]+-\d+/i,
      titleSelectors: [
        // Ozon Studio Compose framework labels widgets in [data-widget].
        // webProductHeading is the public canonical slot for product
        // title — used by Ozon Seller API docs and PriceSpider.
        '[data-widget="webProductHeading"] h1',
        '[data-widget="webProductHeading"]',
        'meta[property="og:title"]',
        ...COMMON_TITLE_SELECTORS
      ],
      categoryCheck: () => {
        const text = document.body.textContent.toLowerCase().slice(0, 5000);
        return /препарат|таблетк|витамин|бад|капсул|сироп|раствор|порошок|саше|аптек/i.test(text);
      }
    }
  };

  const retailer = detectRetailer();
  if (!retailer) return;

  init();

  async function init() {
    legalAccepted = await checkLegalAcceptance();
    listenForAcceptanceChanges();
    if (!legalAccepted) return;
    bootstrap();
    observeUrlChanges();
  }

  async function checkLegalAcceptance() {
    try {
      const stored = await chrome.storage.sync.get(['legalAcceptedAt', 'legalVersion']);
      return Boolean(stored.legalAcceptedAt) && stored.legalVersion === LEGAL_VERSION;
    } catch (e) {
      return false;
    }
  }

  function listenForAcceptanceChanges() {
    try {
      chrome.storage.onChanged.addListener((changes, area) => {
        if (area !== 'sync') return;
        if (!('legalAcceptedAt' in changes) && !('legalVersion' in changes)) return;
        checkLegalAcceptance().then(newState => {
          if (newState === legalAccepted) return;
          legalAccepted = newState;
          if (legalAccepted) {
            bootstrap();
            observeUrlChanges();
          } else {
            removeOverlay();
          }
        });
      });
    } catch (e) {
      // chrome.storage not available - ignore
    }
  }

  function detectRetailer() {
    for (const [name, cfg] of Object.entries(RETAILERS)) {
      if (cfg.hostMatch.test(HOST)) return { name, ...cfg };
    }
    return null;
  }

  function isProductPage() {
    return retailer.urlPattern.test(location.pathname);
  }

  function bootstrap() {
    if (!legalAccepted) return;
    if (!isProductPage()) {
      removeOverlay();
      return;
    }
    waitForElement(retailer.titleSelectors).then(handleProductDetected).catch(() => {});
  }

  function observeUrlChanges() {
    const check = () => {
      if (location.href !== lastUrl) {
        lastUrl = location.href;
        setTimeout(bootstrap, 600);
      }
    };
    setInterval(check, 500);
    window.addEventListener('popstate', check);
  }

  // Headings that appear on every page in retailer chrome (header login
  // modal, cart, account menu, search) but never as a product title.
  // A bare h1 fallback matches them on SPA PDPs where the actual product
  // h1 hasn't rendered yet — reject and try the next selector.
  const TITLE_BLOCKLIST = /^(sign\s*in|log\s*in|register|sign\s*up|create\s*account|my\s*account|account|cart|basket|wishlist|search|menu|home|checkout|skip to main content|loading\.\.\.|404|page not found|not found)$/i;

  // Страницы-ошибки нельзя путать с карточкой товара. Серверы возвращают 200
  // и валидный HTML, а в title/h1 пишут «Ошибка 404», «408 Request Time-out»,
  // «La página que buscabas no existe». Без этой проверки FAB выскакивал на
  // 404-страницах и слал мусор в matcher. Партиал-матч по словесной границе,
  // чтобы товар вроде «404 mg vitamin C» не отрезало.
  const ERROR_PAGE_PATTERNS = [
    /(^|\s)\d{3}\s+(error|request\s+time-?out|page\s+not\s+found|not\s+found)/i,
    /(^|\s)(ошибка|error)\s+\d{3}(\s|\.|$)/i,
    /страница\s+не\s+найдена/i,
    /page\s+not\s+found/i,
    /la\s+p[aá]gina\s+que\s+buscabas\s+no\s+existe/i,
    /p[aá]gina\s+no\s+(encontrada|existe)/i,
    /сайт\s+временно\s+недоступ/i,
  ];

  function looksLikeErrorPage(text) {
    if (!text) return false;
    return ERROR_PAGE_PATTERNS.some(p => p.test(text));
  }

  function readTitleFromElement(el) {
    if (!el) return null;
    // meta[property="og:title"] — title lives in the content attribute.
    if (el.tagName === 'META') {
      const c = el.getAttribute('content');
      return c && c.trim().length > 2 ? c.trim() : null;
    }
    // JSON-LD: look for Product.name in any embedded application/ld+json.
    if (el.tagName === 'SCRIPT' && el.type === 'application/ld+json') {
      try {
        const data = JSON.parse(el.textContent || '');
        const candidates = Array.isArray(data) ? data : [data];
        for (const item of candidates) {
          if (!item || typeof item !== 'object') continue;
          const type = item['@type'];
          const isProduct = type === 'Product'
            || (Array.isArray(type) && type.includes('Product'));
          if (isProduct && typeof item.name === 'string' && item.name.trim().length > 2) {
            return item.name.trim();
          }
        }
      } catch {
        return null;
      }
      return null;
    }
    const txt = el.textContent && el.textContent.trim();
    if (!txt || txt.length <= 2) return null;
    const compact = txt.replace(/\s+/g, ' ');
    if (TITLE_BLOCKLIST.test(compact)) return null;
    if (looksLikeErrorPage(compact)) return null;
    return compact;
  }

  function waitForElement(selectors, timeoutMs = 8000) {
    return new Promise((resolve, reject) => {
      const start = Date.now();
      const tick = () => {
        for (const sel of selectors) {
          const el = document.querySelector(sel);
          const title = readTitleFromElement(el);
          if (title) return resolve({ el, title });
        }
        if (Date.now() - start > timeoutMs) return reject(new Error('timeout'));
        setTimeout(tick, 250);
      };
      tick();
    });
  }

  // Supplement Facts / composition selectors for retailers that publish
  // ingredient tables in the DOM. Hybrid plan: we feed the API both the
  // product title AND a concatenation of these blocks, then multi-match
  // returns every active substance found anywhere in either string.
  // Cap the extracted text so we don't ship 50 KB of side-effects/cookie
  // text to the API — only the first ~3 KB of relevant DOM are sent.
  const INGREDIENT_SELECTORS = {
    iherb: [
      '#product-description-container',
      '[id*="supplement-facts" i]',
      '[class*="supplement-facts" i]',
      '[class*="SupplementFacts" i]',
      '[id*="ingredients" i]',
    ],
    vitaminshoppe: [
      '[data-testid*="supplement-facts" i]',
      '[data-testid*="ingredients" i]',
      '[class*="supplement-facts" i]',
      '[class*="SupplementFacts" i]',
      '[id*="supplement" i]',
    ],
    amazon: [
      '#productDescription',
      '#productOverview_feature_div',
      '#feature-bullets',
      '#productFactsDesktopExpander',
    ],
    // ES parafarmacias publish composition under a "Composición" /
    // "Ingredientes" tab. Most use generic class names like .composition,
    // .ingredientes, or sit inside a tab panel with data-tab="composicion".
    mifarma: [
      '[class*="composicion" i]',
      '[class*="composition" i]',
      '[class*="ingredientes" i]',
      '[data-tab*="composicion" i]',
      '[id*="composicion" i]',
      '.product-info',
      '.product-description',
    ],
    promofarma: [
      '[class*="composicion" i]',
      '[class*="ingredientes" i]',
      '[data-tab*="composicion" i]',
      '.product-info',
      '.product-description',
    ],
    dosfarma: [
      '[class*="composicion" i]',
      '[class*="ingredientes" i]',
      '#ficha-tecnica',
      '#descripcion',
      '.product-description',
    ],
    druni: [
      '[class*="ingredientes" i]',
      '[class*="composicion" i]',
      '[id*="ingredientes" i]',
      '.product-description',
      '.product-details',
    ],
    // RU online pharmacies. Apteka.ru and similar use «Состав» as the
    // composition heading. Selectors anchor on the surrounding container.
    apteka: [
      '[class*="composition" i]',
      '[class*="sostav" i]',
      '[data-block*="sostav" i]',
      '.b-product__description',
      '.product-details',
    ],
    eapteka: [
      '[class*="composition" i]',
      '[class*="sostav" i]',
      '.b-product-card__description',
      '.product-description',
    ],
    // RU-маркетплейсы: блок «характеристик» тащит баннеры/параметры
    // соседних товаров и забивает greedy matcher шумом. Пока что для
    // wildberries/ozon/zdravcity отправляем только заголовок карточки —
    // в API matcher этого достаточно для одиночных активок (D3, магний,
    // омега-3). Мульти-ингредиентные стеки на этих ритейлерах редкость.
    zdravcity: [],
    wildberries: [],
    ozon: [],
  };

  function extractIngredientText() {
    const selectors = INGREDIENT_SELECTORS[retailer.name];
    if (!selectors || !selectors.length) return '';
    const parts = [];
    let totalLen = 0;
    for (const sel of selectors) {
      const nodes = document.querySelectorAll(sel);
      for (const node of nodes) {
        const txt = (node.textContent || '').replace(/\s+/g, ' ').trim();
        if (!txt) continue;
        const room = 3000 - totalLen;
        if (room <= 0) break;
        const chunk = txt.length > room ? txt.slice(0, room) : txt;
        parts.push(chunk);
        totalLen += chunk.length;
        if (totalLen >= 3000) break;
      }
      if (totalLen >= 3000) break;
    }
    return parts.join(' | ');
  }

  async function handleProductDetected(detected) {
    const rawTitle = detected.title;

    // Подстраховка: если URL прошёл паттерн, но сервер вернул 200 с error-страницей
    // (часто у RU/ES магазинов вместо 404), не нагружаем matcher и не показываем FAB.
    if (looksLikeErrorPage(rawTitle) || looksLikeErrorPage(document.title)) {
      return;
    }

    if (retailer.categoryCheck && !retailer.categoryCheck()) {
      return;
    }

    // Hybrid query: title + supplement facts text. The API's multi-match
    // greedy substring search picks up every active ingredient mentioned
    // in either string, so a NOW Foods omega-3 capsule that also lists
    // vitamin E or D inside the panel surfaces all of them as tabs.
    const ingredientText = extractIngredientText();
    const compositeQuery = ingredientText
      ? `${rawTitle} ${ingredientText}`.slice(0, 2000)
      : rawTitle;

    const lookupPayload = {
      title: compositeQuery,
      displayTitle: rawTitle,
      url: location.href,
      retailer: retailer.name,
      locale: detectLocale()
    };

    let result;
    try {
      result = await chrome.runtime.sendMessage({ type: 'LOOKUP', payload: lookupPayload });
    } catch (e) {
      return;
    }

    const matches = Array.isArray(result?.matches) && result.matches.length
      ? result.matches
      : (result?.match ? [result.match] : []);

    if (!matches.length) {
      injectFloatingButton(rawTitle, null, []);
      return;
    }

    injectFloatingButton(rawTitle, matches[0], matches);
  }

  // Locale resolution order (most specific wins):
  //   1. User's manual choice from popup/settings (chrome.storage.sync.language)
  //      — only when set to 'ru' | 'en' | 'es', not 'auto'.
  //   2. Retailer host: amazon.es / mifarma / atida / promofarma / dosfarma /
  //      druni → es; apteka.ru / eapteka / zdravcity / wildberries / ozon → ru.
  //   3. <html lang> attribute on the retailer page (Amazon renders Spanish
  //      content under amazon.com when the customer ships to ES/AR/MX etc.).
  //   4. Chrome UI language / navigator.language as last resort.
  let storedLanguagePref = 'auto';
  try {
    chrome.storage?.sync?.get?.(['language'], (data) => {
      if (data && typeof data.language === 'string') storedLanguagePref = data.language;
    });
    chrome.storage?.onChanged?.addListener?.((changes, area) => {
      if (area !== 'sync' || !changes.language) return;
      storedLanguagePref = changes.language.newValue || 'auto';
    });
  } catch {}

  const HOST_TO_LOCALE = [
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

  function detectLocale() {
    if (storedLanguagePref === 'ru' || storedLanguagePref === 'en' || storedLanguagePref === 'es') {
      return storedLanguagePref;
    }
    for (const [pattern, locale] of HOST_TO_LOCALE) {
      if (pattern.test(HOST)) return locale;
    }
    const pageLang = (document.documentElement.lang || '').toLowerCase();
    if (pageLang.startsWith('ru')) return 'ru';
    if (pageLang.startsWith('es')) return 'es';
    if (pageLang.startsWith('en')) return 'en';
    const uiLang = (chrome.i18n?.getUILanguage?.() || navigator.language || 'en').toLowerCase();
    if (uiLang.startsWith('ru')) return 'ru';
    if (uiLang.startsWith('es')) return 'es';
    return 'en';
  }

  function track(event, extra) {
    try {
      chrome.runtime.sendMessage({ type: 'TRACK', event, extra: extra || {} });
    } catch {}
  }

  function injectFloatingButton(title, match, matches) {
    removeOverlay();
    const matchList = Array.isArray(matches) ? matches : (match ? [match] : []);
    track('FAB_SHOWN', { store: retailer.name, target: match ? match.slug : 'no_match', match_count: matchList.length });
    const root = document.createElement('div');
    root.id = '__evigrade-meds-fab';
    root.dataset.title = title;
    const iconUrl = chrome.runtime.getURL('icons/icon48.png');
    root.innerHTML = `
      <button class="emfab__button" type="button" aria-label="Open Evigrade Meds">
        <img src="${iconUrl}" alt="" />
        <span class="emfab__label"></span>
      </button>
    `;
    const cssUrl = chrome.runtime.getURL('content/overlay.css');
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = cssUrl;
    document.documentElement.appendChild(link);
    document.documentElement.appendChild(root);

    const label = root.querySelector('.emfab__label');
    if (match) {
      label.textContent = matchLabel(match, matchList.length);
      root.classList.add('emfab--match');
    } else {
      label.textContent = noMatchLabel();
      root.classList.add('emfab--nomatch');
    }

    root.querySelector('.emfab__button').addEventListener('click', () => {
      openOverlay(title, match, matchList);
    });
  }

  function matchLabel(match, count) {
    const locale = detectLocale();
    const name = pickName(match, locale);
    const suffix = count && count > 1 ? ` +${count - 1}` : '';
    if (locale === 'ru') return `Справочник: ${name}${suffix}`;
    if (locale === 'es') return `Referencia: ${name}${suffix}`;
    return `Reference: ${name}${suffix}`;
  }

  function noMatchLabel() {
    const locale = detectLocale();
    if (locale === 'ru') return 'Открыть Evigrade Meds';
    if (locale === 'es') return 'Abrir Evigrade Meds';
    return 'Open Evigrade Meds';
  }

  function pickName(match, locale) {
    return match.names?.[locale]?.[0] || match.names?.en?.[0] || match.slug;
  }

  function openOverlay(title, match, matches) {
    closeOverlayPanel();

    const panel = document.createElement('div');
    panel.id = '__evigrade-meds-panel';
    panel.innerHTML = `
      <iframe src="${chrome.runtime.getURL('content/overlay.html')}" frameborder="0"></iframe>
    `;
    document.documentElement.appendChild(panel);

    const matchList = Array.isArray(matches) ? matches : (match ? [match] : []);
    const iframe = panel.querySelector('iframe');
    iframe.addEventListener('load', () => {
      iframe.contentWindow.postMessage({
        type: 'EVIGRADE_MEDS_RENDER',
        title,
        match: matchList[0] || null,
        matches: matchList,
        locale: detectLocale()
      }, '*');
    });

    window.addEventListener('message', handlePanelMessage);
  }

  function handlePanelMessage(e) {
    if (e.data?.type === 'EVIGRADE_MEDS_CLOSE') closeOverlayPanel();
    if (e.data?.type === 'EVIGRADE_MEDS_MANUAL_SEARCH') handleManualSearch(e.data.query);
  }

  async function handleManualSearch(rawQuery) {
    const panel = document.getElementById('__evigrade-meds-panel');
    if (!panel) return;
    const iframe = panel.querySelector('iframe');
    if (!iframe?.contentWindow) return;
    const query = String(rawQuery || '').trim().slice(0, 200);
    if (query.length < 3) return;
    track('MANUAL_SEARCH', { length: query.length });
    let matches = [];
    try {
      const result = await chrome.runtime.sendMessage({
        type: 'LOOKUP',
        payload: { title: query, url: location.href, retailer: 'manual_search', locale: detectLocale() },
      });
      matches = Array.isArray(result?.matches) && result.matches.length
        ? result.matches
        : (result?.match ? [result.match] : []);
    } catch {}
    iframe.contentWindow.postMessage({
      type: 'EVIGRADE_MEDS_RENDER',
      title: query,
      match: matches[0] || null,
      matches,
      locale: detectLocale(),
    }, '*');
  }

  function closeOverlayPanel() {
    const panel = document.getElementById('__evigrade-meds-panel');
    if (panel) panel.remove();
    window.removeEventListener('message', handlePanelMessage);
  }

  function removeOverlay() {
    const fab = document.getElementById('__evigrade-meds-fab');
    if (fab) fab.remove();
    closeOverlayPanel();
  }
})();
