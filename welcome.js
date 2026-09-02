const LEGAL_VERSION = '1.0';

function track(event, extra) {
  try {
    chrome.runtime.sendMessage({ type: 'TRACK', event, extra: extra || {} });
  } catch {}
}

const TRANSLATIONS = {
  ru: {
    docTitle: 'Evigrade Meds',
    langPrompt: 'Выберите язык',
    healthPrompt: 'Особые состояния (если есть)',
    healthPregnancy: 'Беременность',
    healthLactation: 'Лактация',
    welcomeTitle: 'Расширение установлено',
    welcomeLead: 'Справочник по препаратам и БАДам со ссылками на регуляторные источники.',
    card1Title: 'Что вы увидите',
    card1Desc: 'Категория, профиль безопасности при беременности и лактации, ссылки на FDA, EMA, NIH ODS и Cochrane.',
    card2Title: 'Что мы не делаем',
    card2Desc: 'Не даем медицинских рекомендаций. Не назначаем лечение. Не заменяем консультацию врача или фармацевта.',
    card3Title: 'Откуда данные',
    card3Desc: 'Только регуляторы и рецензируемые публикации. Каждый факт подписан источником и датой проверки.',
    step1Title: 'Откройте товар на iHerb, Amazon или VitaminShoppe',
    step1Desc: 'Магазины из списка ниже. Карточка товара любого supplement.',
    step2Title: 'Внизу справа появится плавающая кнопка',
    step2Desc: 'С названием ингредиента, если он в нашей базе.',
    step3Title: 'Нажмите – откроется карточка',
    step3Desc: 'Источники, профиль безопасности, ссылка на полную страницу evigrade.com.',
    storesTitle: 'Поддерживаемые магазины',
    storesNote: 'Список расширяем по мере добавления селекторов.',
    ctaPrimary: 'Открыть iHerb',
    ctaSecondary: 'Каталог на evigrade.com',
    ctaPrimaryHref: 'https://www.iherb.com/',
    ctaSecondaryHref: 'https://www.evigrade.com/ru/ingredients',
    acceptText: 'Принимаю <a href="terms.ru.html" target="_blank" rel="noopener noreferrer">Условия использования</a> и <a href="privacy.ru.html" target="_blank" rel="noopener noreferrer">Политику конфиденциальности</a>. Понимаю, что Evigrade Meds дает только справочную информацию и не заменяет консультацию врача.',
    legalHint: 'Без подтверждения кнопки выше остаются неактивными. Это требование для медицинских справочников.',
    sourcesLabel: 'Источники:',
    sourcesValue: 'ГРЛС Минздрава РФ · FDA · EMA · AEMPS · MHRA · Cochrane · NIH ODS · NICE · WHO · LactMed',
    footerVersion: 'Правовое уведомление v1.0 · 22.05.2026',
    footerTerms: 'Условия',
    footerPrivacy: 'Конфиденциальность',
    footerAbout: 'Источники',
    nonAffiliation: 'Evigrade не связан с FDA, EMA, AEMPS, MHRA, Минздравом РФ, ВОЗ или каким-либо ретейлером (iHerb, Amazon, VitaminShoppe и др.), отображаемым в расширении. Все товарные знаки принадлежат их правообладателям.'
  },
  en: {
    docTitle: 'Evigrade Meds',
    langPrompt: 'Choose language',
    healthPrompt: 'Special status (if any)',
    healthPregnancy: 'Pregnancy',
    healthLactation: 'Breastfeeding',
    welcomeTitle: 'Extension installed',
    welcomeLead: 'A reference for medications and dietary supplements, with links to the original regulatory sources.',
    card1Title: 'What you will see',
    card1Desc: 'Category, pregnancy and lactation safety profile, links to FDA, EMA, NIH ODS, and Cochrane. Statements regarding dietary supplements have not been evaluated by the FDA and are not intended to diagnose, treat, cure, or prevent any disease.',
    card2Title: 'What we do not do',
    card2Desc: 'No medical advice. No treatment decisions. No substitute for a consultation with a doctor or pharmacist.',
    card3Title: 'Where the data comes from',
    card3Desc: 'Regulators and peer-reviewed publications only. Every fact carries a source citation and verification date.',
    step1Title: 'Open a product on iHerb, Amazon, or VitaminShoppe',
    step1Desc: 'Any supplement product page on the retailers listed below.',
    step2Title: 'A floating button appears at the bottom right',
    step2Desc: 'It carries the ingredient name when the product is in our database.',
    step3Title: 'Click it – the card opens',
    step3Desc: 'Sources, safety profile, and a link to the full evigrade.com page.',
    storesTitle: 'Supported retailers',
    storesNote: 'We add new selectors over time.',
    ctaPrimary: 'Open iHerb',
    ctaSecondary: 'Catalog on evigrade.com',
    ctaPrimaryHref: 'https://www.iherb.com/',
    ctaSecondaryHref: 'https://www.evigrade.com/en/ingredients',
    acceptText: 'I accept the <a href="terms.html" target="_blank" rel="noopener noreferrer">Terms of Service</a> and the <a href="privacy.html" target="_blank" rel="noopener noreferrer">Privacy Policy</a>. I understand that Evigrade Meds is for reference only and does not replace a consultation with a healthcare professional.',
    legalHint: 'Without confirmation the buttons above stay inactive. This is required for medical reference tools.',
    sourcesLabel: 'Sources:',
    sourcesValue: 'FDA · EMA · AEMPS · MHRA · Cochrane · NIH ODS · NICE · BNF · WHO · LactMed · ГРЛС',
    footerVersion: 'Legal notice v1.0 · 2026-05-22',
    footerTerms: 'Terms',
    footerPrivacy: 'Privacy',
    footerAbout: 'Sources',
    nonAffiliation: 'Evigrade is not affiliated with the FDA, EMA, AEMPS, MHRA, the Ministry of Health of the Russian Federation, the WHO, or any retailer shown in the extension (iHerb, Amazon, VitaminShoppe, and others). All trademarks remain the property of their respective owners.'
  },
  es: {
    docTitle: 'Evigrade Meds',
    langPrompt: 'Elija el idioma',
    healthPrompt: 'Estado especial (si procede)',
    healthPregnancy: 'Embarazo',
    healthLactation: 'Lactancia',
    welcomeTitle: 'Extensión instalada',
    welcomeLead: 'Referencia sobre medicamentos y complementos alimenticios, con enlaces a las fuentes regulatorias originales.',
    card1Title: 'Qué verá',
    card1Desc: 'Categoría, perfil de seguridad en embarazo y lactancia, enlaces a AEMPS, EMA, FDA, NIH ODS y Cochrane.',
    card2Title: 'Qué no hacemos',
    card2Desc: 'Sin consejo médico. Sin decisiones de tratamiento. No sustituimos la consulta con un médico o farmacéutico.',
    card3Title: 'De dónde vienen los datos',
    card3Desc: 'Solo organismos reguladores y publicaciones revisadas por pares. Cada dato lleva la fuente y la fecha de verificación.',
    step1Title: 'Abra una ficha en iHerb, Amazon o VitaminShoppe',
    step1Desc: 'Cualquier complemento en los comercios listados abajo.',
    step2Title: 'En la esquina inferior derecha aparecerá un botón flotante',
    step2Desc: 'Con el nombre del ingrediente, si está en nuestra base.',
    step3Title: 'Púlselo – se abre la ficha',
    step3Desc: 'Fuentes, perfil de seguridad y enlace a la página completa en evigrade.com.',
    storesTitle: 'Comercios compatibles',
    storesNote: 'Ampliamos la lista a medida que añadimos selectores.',
    ctaPrimary: 'Abrir iHerb',
    ctaSecondary: 'Catálogo en evigrade.com',
    ctaPrimaryHref: 'https://www.iherb.com/',
    ctaSecondaryHref: 'https://www.evigrade.com/es/ingredients',
    acceptText: 'Acepto los <a href="terms.es.html" target="_blank" rel="noopener noreferrer">Términos de Servicio</a> y la <a href="privacy.es.html" target="_blank" rel="noopener noreferrer">Política de Privacidad</a>. Entiendo que Evigrade Meds tiene fines de referencia y no sustituye la consulta con un profesional sanitario.',
    legalHint: 'Sin confirmación los botones de arriba permanecen inactivos. Es obligatorio para una referencia médica.',
    sourcesLabel: 'Fuentes:',
    sourcesValue: 'AEMPS · EMA · FDA · MHRA · Cochrane · NIH ODS · NICE · WHO · LactMed · e-lactancia',
    footerVersion: 'Aviso legal v1.0 · 2026-05-22',
    footerTerms: 'Términos',
    footerPrivacy: 'Privacidad',
    footerAbout: 'Fuentes',
    nonAffiliation: 'Evigrade no mantiene vínculo alguno con la AEMPS, la EMA, la FDA, la MHRA, el Ministerio de Sanidad de la Federación Rusa, la OMS ni con ninguno de los comercios mostrados en la extensión (iHerb, Amazon, VitaminShoppe y otros). Todas las marcas registradas pertenecen a sus respectivos titulares.'
  }
};

function detectInitialLang() {
  const uiLang = (chrome.i18n.getUILanguage() || navigator.language || 'en').toLowerCase();
  if (uiLang.startsWith('ru')) return 'ru';
  if (uiLang.startsWith('es')) return 'es';
  return 'en';
}

let currentLang = detectInitialLang();

function applyLang(lang) {
  currentLang = lang;
  const t = TRANSLATIONS[lang] || TRANSLATIONS.en;
  document.documentElement.lang = lang;
  document.title = t.docTitle;

  setText('langPrompt', t.langPrompt);
  setText('healthPrompt', t.healthPrompt);
  setText('healthPregBtn', t.healthPregnancy);
  setText('healthLactBtn', t.healthLactation);
  setText('welcomeTitle', t.welcomeTitle);
  setText('welcomeLead', t.welcomeLead);
  setText('card1Title', t.card1Title);
  setText('card1Desc', t.card1Desc);
  setText('card2Title', t.card2Title);
  setText('card2Desc', t.card2Desc);
  setText('card3Title', t.card3Title);
  setText('card3Desc', t.card3Desc);
  setText('step1Title', t.step1Title);
  setText('step1Desc', t.step1Desc);
  setText('step2Title', t.step2Title);
  setText('step2Desc', t.step2Desc);
  setText('step3Title', t.step3Title);
  setText('step3Desc', t.step3Desc);
  setText('storesTitle', t.storesTitle);
  setText('storesNote', t.storesNote);
  setText('ctaPrimary', t.ctaPrimary);
  setText('ctaSecondary', t.ctaSecondary);
  setText('legalHint', t.legalHint);
  setText('sourcesLabel', t.sourcesLabel);
  setText('sourcesValue', t.sourcesValue);
  setText('footerVersion', t.footerVersion);
  setText('footerTerms', t.footerTerms);
  setText('footerPrivacy', t.footerPrivacy);
  setText('footerAbout', t.footerAbout);
  setText('nonAffiliationBar', t.nonAffiliation);

  document.getElementById('acceptText').innerHTML = t.acceptText;
  document.getElementById('ctaPrimary').setAttribute('href', t.ctaPrimaryHref);
  document.getElementById('ctaSecondary').setAttribute('href', t.ctaSecondaryHref);

  // Footer-ссылки на локальные документы политики: EN → terms.html,
  // RU/ES → terms.ru.html / terms.es.html. Так пользователь читает
  // legal-документ на том же языке, что и UI.
  const docSuffix = lang === 'en' ? '' : `.${lang}`;
  const footerTermsEl = document.getElementById('footerTerms');
  const footerPrivacyEl = document.getElementById('footerPrivacy');
  const footerAboutEl = document.getElementById('footerAbout');
  if (footerTermsEl) footerTermsEl.setAttribute('href', `terms${docSuffix}.html`);
  if (footerPrivacyEl) footerPrivacyEl.setAttribute('href', `privacy${docSuffix}.html`);
  if (footerAboutEl) footerAboutEl.setAttribute('href', `about${docSuffix}.html`);

  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.lang === lang);
  });
}

function setText(id, value) {
  const el = document.getElementById(id);
  if (el) el.textContent = value;
}

function setCtaEnabled(enabled) {
  document.querySelectorAll('.cta').forEach(el => {
    el.classList.toggle('disabled', !enabled);
    el.setAttribute('aria-disabled', String(!enabled));
  });
}

async function loadAcceptanceState() {
  const stored = await chrome.storage.sync.get(['legalAcceptedAt', 'legalVersion', 'legalLocale']);
  if (stored.legalAcceptedAt && stored.legalVersion === LEGAL_VERSION) {
    document.getElementById('acceptCheckbox').checked = true;
    setCtaEnabled(true);
    if (stored.legalLocale && TRANSLATIONS[stored.legalLocale]) {
      applyLang(stored.legalLocale);
    }
  } else {
    setCtaEnabled(false);
  }
}

// GDPR Art. 9 special category data. chrome.storage.local stays
// device-only and never leaks through chrome.storage.sync (Google
// account servers). The separate /api/meds/health-profile endpoint
// is opt-in via NextAuth login on evigrade.com and lets the same
// user see the same flags across devices — anonymous installs keep
// the local-only behaviour.
const HEALTH_PROFILE_URL = globalThis.evgMedsContract?.HEALTH_PROFILE_URL
  || 'https://www.evigrade.com/api/meds/health-profile';

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
    // best-effort; chrome.storage.local stays the source of truth
  }
}

async function loadHealthProfile() {
  const { healthProfile = { pregnancy: false, lactation: false } } = await chrome.storage.local.get('healthProfile');
  document.getElementById('healthPregBtn').classList.toggle('active', !!healthProfile.pregnancy);
  document.getElementById('healthLactBtn').classList.toggle('active', !!healthProfile.lactation);

  // Background pull. If the user logs in inside the welcome flow (rare
  // but possible), reconcile the server row with local. Server wins
  // because it represents the cross-device state Vika picks in account.
  const remote = await fetchHealthProfileFromServer();
  if (!remote || !remote.authenticated) return;
  if (!remote.profile) {
    await pushHealthProfileToServer(healthProfile);
    return;
  }
  const changed =
    remote.profile.pregnancy !== !!healthProfile.pregnancy
    || remote.profile.lactation !== !!healthProfile.lactation;
  if (!changed) return;
  const next = {
    pregnancy: remote.profile.pregnancy,
    lactation: remote.profile.lactation,
  };
  await chrome.storage.local.set({ healthProfile: next });
  document.getElementById('healthPregBtn').classList.toggle('active', next.pregnancy);
  document.getElementById('healthLactBtn').classList.toggle('active', next.lactation);
}

async function toggleHealth(kind) {
  const { healthProfile = { pregnancy: false, lactation: false } } = await chrome.storage.local.get('healthProfile');
  healthProfile[kind] = !healthProfile[kind];
  await chrome.storage.local.set({ healthProfile });
  pushHealthProfileToServer(healthProfile);
  await loadHealthProfile();
}

document.addEventListener('DOMContentLoaded', async () => {
  applyLang(currentLang);
  await loadAcceptanceState();
  await loadHealthProfile();
  track('WELCOME_OPENED');

  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      applyLang(btn.dataset.lang);
      track('LANG_SWITCH', { target: btn.dataset.lang });
    });
  });

  document.querySelectorAll('.health-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      toggleHealth(btn.dataset.health);
      track('WELCOME_HEALTH_TOGGLED', { target: btn.dataset.health });
    });
  });

  document.querySelectorAll('[data-cta]').forEach(el => {
    el.addEventListener('click', () => track('WELCOME_CTA', { target: el.dataset.cta }));
  });

  const checkbox = document.getElementById('acceptCheckbox');
  checkbox.addEventListener('change', async () => {
    if (checkbox.checked) {
      const record = {
        legalAcceptedAt: new Date().toISOString(),
        legalVersion: LEGAL_VERSION,
        legalLocale: currentLang
      };
      try {
        await chrome.storage.sync.set(record);
      } catch (e) {
        console.error('Failed to save acceptance', e);
      }
      setCtaEnabled(true);
      track('WELCOME_LEGAL_ACCEPTED', { target: currentLang });
    } else {
      try {
        await chrome.storage.sync.remove(['legalAcceptedAt', 'legalVersion', 'legalLocale']);
      } catch (e) {
        console.error('Failed to clear acceptance', e);
      }
      setCtaEnabled(false);
    }
  });
});
