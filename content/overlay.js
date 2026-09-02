'use strict';

const I18N = {
  en: {
    panelTitle: 'Evigrade Meds',
    disclaimer: 'Educational reference only. Does not replace a healthcare professional.',
    productLabel: 'Product on page',
    sources: 'Sources',
    pregnancy: 'Pregnancy',
    lactation: 'Breastfeeding',
    indicationsTitle: 'Why people take this',
    indicationsMore: (n) => `+${n} more on evigrade.com →`,
    evidenceBadge: {
      A: 'Strong evidence',
      B: 'Selected populations',
      C: 'Conflicting evidence',
      D: 'Weak evidence',
      F: 'Marketing claim',
    },
    doseSection: 'Dose and toxicity',
    doseRdaLabel: 'Daily reference intake',
    doseUlLabel: 'Safe upper limit (UL)',
    doseUlNotSet: 'No upper limit set for healthy adults',
    doseToxicityHeader: 'Why excess matters',
    doseBolusHeader: 'Sometimes given as a short loading course',
    doseSourceLabel: 'Source',
    doseFatSolubleTag: 'Fat-soluble vitamin — accumulates',
    doseFattyAcidTag: 'Fatty acid',
    doseMineralTag: 'Mineral with narrow safety window',
    selfMedicationDisclaimer:
      'Supplements are not a harmless alternative to medication. Fat-soluble vitamins accumulate and can become toxic. Many supplements interact with prescription drugs. Before starting a course, talk to a clinician and get blood work for any suspected deficiency — otherwise the risks outweigh the benefit.',
    interactions: 'Drug interactions to be aware of',
    interactionsDisclaimer: 'Information only. Confirm with your pharmacist or physician before changing therapy.',
    seeOnEvigrade: 'See full reference on evigrade.com',
    notFoundTitle: 'Not yet in our database',
    notFoundDesc: 'We have not yet published a reference entry for this product.',
    searchOnSite: 'Search evigrade.com',
    searchBoxLabel: 'Look up an ingredient in our reference',
    searchBoxHint: 'For products with multiple ingredients — type a single one (omega-3, vitamin D, magnesium).',
    searchBoxPlaceholder: 'e.g. vitamin D',
    searchBoxSubmit: 'Look up',
    searchBoxNotFound: 'No match found. Try a different wording or check the spelling.',
    searchBoxTooShort: 'Type at least 3 letters.',
    perCard: 'Sources are listed above. Data is collected from regulatory and peer-reviewed publications; the verification date is set per source. The extension does not provide medical advice. Statements regarding dietary supplements have not been evaluated by the FDA and are not intended to diagnose, treat, cure, or prevent any disease.',
    viewSource: 'View source',
    addPregnancy: 'I am pregnant',
    addLactation: 'I am breastfeeding',
    healthHint: 'Pregnant or breastfeeding? Add it to your profile to see the relevant safety notes.',
    sourceType: {
      regulatory: 'Regulatory source',
      systematic_review: 'Systematic review',
      clinical_guideline: 'Clinical guideline',
      position_paper: 'Professional society',
      label: 'Regulatory label'
    },
    pregStatus: {
      compatible: 'Compatible',
      likely_safe: 'Likely safe',
      monitor: 'Use with caution',
      likely_unsafe: 'Likely unsafe',
      contraindicated: 'Contraindicated',
      insufficient_data: 'Insufficient data',
      limited_data: 'Limited data',
      compatible_within_ul: 'Within tolerable upper intake',
      generally_compatible: 'Generally compatible'
    },
    waitlistBadge: 'Coming soon · Pro',
    waitlistTitle: 'Drug interaction reference',
    waitlistDesc: 'Add your current medications and look up published interaction information cited from FDA, EMA, and NIH ODS sources for the product on this page. Educational reference only; not a substitute for review by your pharmacist or physician. Leave your email to be notified when this feature launches.',
    waitlistCta: 'Notify me at launch',
    waitlistEmailPlaceholder: 'your.email@example.com',
    waitlistSubmit: 'Submit',
    waitlistNote: 'Your medication list is processed only on your device. We use your email solely to notify you when the feature launches.',
    waitlistConsent: 'I have read the <a href="" data-doc="privacy" target="_blank" rel="noopener">Privacy Policy</a> and agree that my email will be used only to notify me when this feature launches.',
    waitlistConsentRequired: 'Please confirm the consent checkbox.',
    waitlistSuccess: 'Saved. We will notify you when the feature launches.',
    waitlistErrorInvalid: 'Please enter a valid email address.',
    waitlistErrorGeneric: 'Could not save right now. Please try again later.',
    adverse: 'Report a side effect',
    adversePopTitle: 'Where to report?',
    adverseRegions: {
      US: { country: 'United States', authority: 'FDA MedWatch' },
      EU: { country: 'European Union', authority: 'EudraVigilance' },
      ES: { country: 'Spain', authority: 'AEMPS NotificaRAM' },
      UK: { country: 'United Kingdom', authority: 'MHRA Yellow Card' },
      RU: { country: 'Russia', authority: 'Roszdravnadzor' }
    },
    close: 'Close',
    termsLink: 'Terms',
    cosmeticsPromoTitle: 'Reading labels of creams and serums?',
    cosmeticsPromoDesc: 'Evigrade extension shows an evidence-tier panel on Wildberries, Goldapple, iHerb, Sephora and 12 more stores. Same database, same approach.',
    cosmeticsPromoCta: 'Install free'
  },
  es: {
    panelTitle: 'Evigrade Meds',
    disclaimer: 'Solo referencia educativa. No sustituye al profesional sanitario.',
    productLabel: 'Producto en la página',
    sources: 'Fuentes',
    pregnancy: 'Embarazo',
    lactation: 'Lactancia',
    indicationsTitle: 'Para qué se toma',
    indicationsMore: (n) => `+${n} más en evigrade.com →`,
    evidenceBadge: {
      A: 'Evidencia sólida',
      B: 'Poblaciones concretas',
      C: 'Evidencia mixta',
      D: 'Evidencia débil',
      F: 'Reclamo de marketing',
    },
    doseSection: 'Dosis y toxicidad',
    doseRdaLabel: 'Ingesta diaria de referencia',
    doseUlLabel: 'Límite superior seguro (UL)',
    doseUlNotSet: 'No se ha establecido UL en adultos sanos',
    doseToxicityHeader: 'Por qué importa el exceso',
    doseBolusHeader: 'A veces se pauta como ciclo corto de carga',
    doseSourceLabel: 'Fuente',
    doseFatSolubleTag: 'Vitamina liposoluble — se acumula',
    doseFattyAcidTag: 'Ácido graso',
    doseMineralTag: 'Mineral con margen de seguridad estrecho',
    selfMedicationDisclaimer:
      'Los suplementos no son una alternativa inocua a los medicamentos. Las vitaminas liposolubles se acumulan y pueden volverse tóxicas. Muchos suplementos interaccionan con fármacos. Antes de iniciar un ciclo, hable con un médico y haga analíticas para confirmar cualquier déficit: de lo contrario los riesgos superan al beneficio.',
    interactions: 'Interacciones a tener en cuenta',
    interactionsDisclaimer: 'Información de referencia. Consulte con su farmacéutico o médico antes de modificar la pauta.',
    seeOnEvigrade: 'Ver referencia completa en evigrade.com',
    notFoundTitle: 'Aún no está en nuestra base',
    notFoundDesc: 'Todavía no hemos publicado una entrada de referencia para este producto.',
    searchOnSite: 'Buscar en evigrade.com',
    searchBoxLabel: 'Buscar un ingrediente en nuestra referencia',
    searchBoxHint: 'Si el producto tiene varios ingredientes, escriba uno (omega-3, vitamina D, magnesio).',
    searchBoxPlaceholder: 'Ej. vitamina D',
    searchBoxSubmit: 'Buscar',
    searchBoxNotFound: 'No se ha encontrado. Pruebe otra grafía o revise la ortografía.',
    searchBoxTooShort: 'Escriba al menos 3 letras.',
    perCard: 'Las fuentes figuran arriba. Los datos proceden de publicaciones regulatorias y revisadas por pares; la fecha de verificación es individual para cada fuente. La extensión no proporciona consejo médico.',
    viewSource: 'Ver fuente',
    addPregnancy: 'Estoy embarazada',
    addLactation: 'Estoy en lactancia',
    healthHint: '¿Embarazada o en lactancia? Añádalo al perfil para ver las notas de seguridad.',
    sourceType: {
      regulatory: 'Fuente regulatoria',
      systematic_review: 'Revisión sistemática',
      clinical_guideline: 'Guía clínica',
      position_paper: 'Sociedad profesional',
      label: 'Ficha técnica'
    },
    pregStatus: {
      compatible: 'Compatible',
      likely_safe: 'Probablemente seguro',
      monitor: 'Usar con precaución',
      likely_unsafe: 'Probablemente inseguro',
      contraindicated: 'Contraindicado',
      insufficient_data: 'Datos insuficientes',
      limited_data: 'Datos limitados',
      compatible_within_ul: 'Dentro del límite superior',
      generally_compatible: 'Generalmente compatible'
    },
    waitlistBadge: 'Próximamente · Pro',
    waitlistTitle: 'Buscador de información sobre interacciones',
    waitlistDesc: 'Añada los medicamentos que toma y consulte información publicada por la FDA, la EMA y NIH ODS sobre interacciones documentadas con el producto de esta página. Solo información de referencia educativa; no sustituye la revisión por su médico o farmacéutico. Deje su correo para recibir aviso cuando esta funcionalidad esté disponible.',
    waitlistCta: 'Avisarme en el lanzamiento',
    waitlistEmailPlaceholder: 'su.correo@ejemplo.com',
    waitlistSubmit: 'Enviar',
    waitlistNote: 'Su lista de medicamentos se procesa solo en su dispositivo. Su correo se utiliza únicamente para avisarle cuando la funcionalidad esté disponible.',
    waitlistConsent: 'He leído la <a href="" data-doc="privacy" target="_blank" rel="noopener">Política de Privacidad</a> y acepto que mi correo se use únicamente para avisarme cuando la funcionalidad esté disponible.',
    waitlistConsentRequired: 'Confirme la casilla de consentimiento.',
    waitlistSuccess: 'Guardado. Le avisaremos cuando la funcionalidad esté disponible.',
    waitlistErrorInvalid: 'Introduzca un correo electrónico válido.',
    waitlistErrorGeneric: 'No se pudo guardar ahora. Inténtelo más tarde.',
    adverse: 'Notificar efecto adverso',
    adversePopTitle: '¿Dónde notificar?',
    adverseRegions: {
      US: { country: 'Estados Unidos', authority: 'FDA MedWatch' },
      EU: { country: 'Unión Europea', authority: 'EudraVigilance' },
      ES: { country: 'España', authority: 'AEMPS NotificaRAM' },
      UK: { country: 'Reino Unido', authority: 'MHRA Yellow Card' },
      RU: { country: 'Rusia', authority: 'Roszdravnadzor' }
    },
    close: 'Cerrar',
    termsLink: 'Términos',
    cosmeticsPromoTitle: '¿Lees etiquetas de cremas y sérums?',
    cosmeticsPromoDesc: 'La extensión Evigrade muestra un panel evidence-tier en Wildberries, Goldapple, iHerb, Sephora y otras 12 tiendas. Misma base, mismo enfoque.',
    cosmeticsPromoCta: 'Instalar gratis'
  },
  ru: {
    panelTitle: 'Evigrade Meds',
    disclaimer: 'Только справочная информация. Не заменяет консультацию врача.',
    productLabel: 'Продукт на странице',
    sources: 'Источники',
    pregnancy: 'Беременность',
    lactation: 'Лактация',
    indicationsTitle: 'Зачем принимают',
    indicationsMore: (n) => `+${n} ещё на evigrade.com →`,
    evidenceBadge: {
      A: 'Сильные доказательства',
      B: 'Отдельные группы пациентов',
      C: 'Противоречивые данные',
      D: 'Слабые доказательства',
      F: 'Маркетинговое утверждение',
    },
    doseSection: 'Доза и токсичность',
    doseRdaLabel: 'Суточная норма',
    doseUlLabel: 'Безопасный верхний предел (UL)',
    doseUlNotSet: 'У здоровых взрослых верхний предел не установлен',
    doseToxicityHeader: 'Чем опасен передоз',
    doseBolusHeader: 'Иногда назначают короткими курсами',
    doseSourceLabel: 'Источник',
    doseFatSolubleTag: 'Жирорастворимый витамин — накапливается',
    doseFattyAcidTag: 'Жирная кислота',
    doseMineralTag: 'Микроэлемент с узким окном безопасности',
    selfMedicationDisclaimer:
      'БАДы – не безобидная альтернатива лекарствам. Жирорастворимые витамины накапливаются и могут стать токсичны. Многие добавки взаимодействуют с препаратами. Перед курсом обсудите с врачом и сдайте анализы на подозреваемый дефицит – иначе риски перевешивают пользу.',
    interactions: 'Известные взаимодействия',
    interactionsDisclaimer: 'Только справочная информация. Перед изменением схемы согласуйте с фармацевтом или врачом.',
    seeOnEvigrade: 'Полная карточка на evigrade.com',
    notFoundTitle: 'Пока нет в базе',
    notFoundDesc: 'Справочной карточки по этому продукту у нас пока нет.',
    searchOnSite: 'Искать на evigrade.com',
    searchBoxLabel: 'Найти ингредиент в нашей базе',
    searchBoxHint: 'Если в продукте несколько компонентов, введите один из них (омега-3, витамин D, магний).',
    searchBoxPlaceholder: 'Например, витамин D',
    searchBoxSubmit: 'Найти',
    searchBoxNotFound: 'По этому запросу ничего не нашли. Попробуйте другое написание или проверьте опечатки.',
    searchBoxTooShort: 'Введите минимум 3 буквы.',
    perCard: 'Источники указаны выше. Данные собраны из регуляторных и рецензируемых публикаций; дата проверки своя у каждого источника. Расширение не дает медицинских рекомендаций.',
    viewSource: 'К источнику',
    addPregnancy: 'Я беременна',
    addLactation: 'Я кормлю грудью',
    healthHint: 'Беременны или кормите грудью? Добавьте в профиль – покажем оценки для этих случаев.',
    sourceType: {
      regulatory: 'Регуляторный источник',
      systematic_review: 'Систематический обзор',
      clinical_guideline: 'Клинические рекомендации',
      position_paper: 'Профессиональное общество',
      label: 'Инструкция / SmPC'
    },
    pregStatus: {
      compatible: 'Совместимо',
      likely_safe: 'Вероятно безопасно',
      monitor: 'С осторожностью',
      likely_unsafe: 'Вероятно небезопасно',
      contraindicated: 'Противопоказано',
      insufficient_data: 'Данных недостаточно',
      limited_data: 'Ограниченные данные',
      compatible_within_ul: 'В пределах допустимого',
      generally_compatible: 'Обычно совместимо'
    },
    waitlistBadge: 'Скоро · Pro',
    waitlistTitle: 'Справочник взаимодействий',
    waitlistDesc: 'Добавьте препараты, которые вы сейчас принимаете, и смотрите опубликованные данные FDA, EMA и NIH ODS о задокументированных взаимодействиях с продуктом на этой странице. Только справочная информация; не заменяет консультацию врача или фармацевта. Оставьте почту – напишем, когда функция станет доступна.',
    waitlistCta: 'Сообщить при запуске',
    waitlistEmailPlaceholder: 'ваш.адрес@пример.ru',
    waitlistSubmit: 'Отправить',
    waitlistNote: 'Список ваших препаратов обрабатывается только на устройстве. Почта нужна только для уведомления о запуске функции.',
    waitlistConsent: 'Я прочитал(а) <a href="" data-doc="privacy" target="_blank" rel="noopener">Политику конфиденциальности</a> и согласен(на), что мой адрес будет использован только для уведомления о запуске функции.',
    waitlistConsentRequired: 'Подтвердите согласие.',
    waitlistSuccess: 'Сохранено. Напишем, когда функция станет доступна.',
    waitlistErrorInvalid: 'Введите корректный адрес почты.',
    waitlistErrorGeneric: 'Не удалось сохранить. Попробуйте позже.',
    adverse: 'Побочное действие',
    adversePopTitle: 'Куда сообщить?',
    adverseRegions: {
      US: { country: 'США', authority: 'FDA MedWatch' },
      EU: { country: 'ЕС', authority: 'EudraVigilance' },
      ES: { country: 'Испания', authority: 'AEMPS NotificaRAM' },
      UK: { country: 'Великобритания', authority: 'MHRA Yellow Card' },
      RU: { country: 'Россия', authority: 'Росздравнадзор' }
    },
    close: 'Закрыть',
    termsLink: 'Условия',
    cosmeticsPromoTitle: 'Читаете составы кремов и сывороток?',
    cosmeticsPromoDesc: 'Расширение Evigrade показывает evidence-tier плашку на Wildberries, Goldapple, iHerb, Sephora и еще 12 магазинах. Та же база, тот же подход.',
    cosmeticsPromoCta: 'Установить бесплатно'
  }
};

const ADVERSE_LINKS = {
  US: 'https://www.fda.gov/safety/medwatch-fda-safety-information-and-adverse-event-reporting-program',
  EU: 'https://www.adrreports.eu/',
  ES: 'https://www.notificaram.es/',
  UK: 'https://yellowcard.mhra.gov.uk/',
  RU: 'https://roszdravnadzor.gov.ru/services/lawreact'
};

let currentLocale = 'en';
let currentMatch = null;
let currentMatches = [];
let currentActiveIndex = 0;
let currentTitle = '';
let healthProfile = { pregnancy: false, lactation: false };

function track(event, extra) {
  try {
    chrome.runtime.sendMessage({ type: 'TRACK', event, extra: extra || {} });
  } catch {}
}

// Allowlist of parent origins that may postMessage into this iframe.
// The overlay is only ever embedded by our own content script on these
// retailer pages. Anything else (a malicious nested iframe, sibling
// window from user-content on the retailer) is rejected.
// Хосты должны совпадать со списком content_scripts.matches в manifest.json.
const ALLOWED_PARENT_ORIGINS = new RegExp(
  '^https:\\/\\/([a-z0-9-]+\\.)?(' +
    [
      'iherb\\.com',
      'amazon\\.com',
      'amazon\\.es',
      'amazon\\.co\\.uk',
      'amazon\\.de',
      'vitaminshoppe\\.com',
      'mifarma\\.es',
      'atida\\.com',
      'promofarma\\.com',
      'dosfarma\\.com',
      'druni\\.es',
      'apteka\\.ru',
      'eapteka\\.ru',
      'zdravcity\\.ru',
      'wildberries\\.(?:ru|am|by|kz|uz|kg)',
      'ozon\\.(?:ru|com)',
    ].join('|') +
    ')$'
);

window.addEventListener('message', async (event) => {
  // Defence-in-depth: only accept messages from our own parent window
  // and only from a retailer origin. Even though render() escapes every
  // field via escapeHtml, locking the channel down prevents future
  // regressions from turning into XSS.
  if (event.source !== window.parent) return;
  if (!ALLOWED_PARENT_ORIGINS.test(event.origin)) return;

  const data = event.data;
  if (!data || data.type !== 'EVIGRADE_MEDS_RENDER') return;
  currentLocale = data.locale || 'en';
  // matches[] is the new shape (supports multi-ingredient products); for
  // back-compat the server still sends a single `match` mirror = matches[0].
  const rawMatches = Array.isArray(data.matches) ? data.matches : (data.match ? [data.match] : []);
  currentMatches = rawMatches.map(sanitizeMatch).filter(Boolean);
  currentActiveIndex = 0;
  currentMatch = currentMatches[0] || null;
  currentTitle = String(data.title || '').slice(0, 500);
  await loadHealthProfile();
  render();
  track('PANEL_SHOWN', { target: currentMatch ? currentMatch.slug : 'no_match', match_count: currentMatches.length });
});

// React to popup toggles: if the user flips pregnancy / lactation in the
// extension popup while the overlay iframe is open, re-render so the
// conditional sections appear or disappear without reloading the tab.
try {
  chrome.storage?.onChanged?.addListener((changes, area) => {
    if (area !== 'local' || !changes.healthProfile) return;
    const next = changes.healthProfile.newValue || { pregnancy: false, lactation: false };
    healthProfile = { pregnancy: Boolean(next.pregnancy), lactation: Boolean(next.lactation) };
    if (currentTitle) render();
  });
} catch {}

// Reject any URL that is not http(s) so a tampered payload can never
// sneak in `javascript:`, `data:`, `vbscript:` or other dangerous
// protocols into an href attribute we generate below.
function safeUrl(url) {
  if (typeof url !== 'string') return null;
  if (url.length > 2000) return null;
  try {
    const parsed = new URL(url);
    if (parsed.protocol !== 'http:' && parsed.protocol !== 'https:') return null;
    return parsed.href;
  } catch {
    return null;
  }
}

function sanitizeMatch(match) {
  if (!match || typeof match !== 'object') return null;
  const out = { slug: typeof match.slug === 'string' ? match.slug.slice(0, 100) : null };
  if (match.names && typeof match.names === 'object') out.names = match.names;
  if (typeof match.category_en === 'string') out.category_en = match.category_en.slice(0, 200);
  if (match.pregnancy && typeof match.pregnancy === 'object') {
    out.pregnancy = {
      status: typeof match.pregnancy.status === 'string' ? match.pregnancy.status : null,
      note_en: typeof match.pregnancy.note_en === 'string' ? match.pregnancy.note_en : null,
      source_url: safeUrl(match.pregnancy.source_url),
    };
  }
  if (match.lactation && typeof match.lactation === 'object') {
    out.lactation = {
      status: typeof match.lactation.status === 'string' ? match.lactation.status : null,
      note_en: typeof match.lactation.note_en === 'string' ? match.lactation.note_en : null,
      source_url: safeUrl(match.lactation.source_url),
    };
  }
  if (Array.isArray(match.top_indications)) {
    out.top_indications = match.top_indications
      .filter((it) => it && typeof it === 'object')
      .slice(0, 5)
      .map((it) => ({
        condition_slug: typeof it.condition_slug === 'string' ? it.condition_slug.slice(0, 120) : '',
        condition_name: {
          ru: typeof it.condition_name?.ru === 'string' ? it.condition_name.ru.slice(0, 200) : '',
          en: typeof it.condition_name?.en === 'string' ? it.condition_name.en.slice(0, 200) : '',
          es: typeof it.condition_name?.es === 'string' ? it.condition_name.es.slice(0, 200) : null,
        },
        evidence_tier: ['A', 'B', 'C', 'D', 'F'].includes(it.evidence_tier) ? it.evidence_tier : 'D',
        summary: {
          ru: typeof it.summary?.ru === 'string' ? it.summary.ru.slice(0, 400) : '',
          en: typeof it.summary?.en === 'string' ? it.summary.en.slice(0, 400) : '',
          es: typeof it.summary?.es === 'string' ? it.summary.es.slice(0, 400) : null,
        },
      }))
      .filter((it) => it.condition_slug);
  }
  if (typeof match.indications_total === 'number' && Number.isFinite(match.indications_total)) {
    out.indications_total = Math.max(0, Math.floor(match.indications_total));
  }
  if (match.nutrient_dose && typeof match.nutrient_dose === 'object') {
    const nd = match.nutrient_dose;
    const validKinds = ['FAT_SOLUBLE_VITAMIN', 'WATER_SOLUBLE_VITAMIN', 'MINERAL_MAJOR', 'MINERAL_TRACE', 'FATTY_ACID', 'AMINO_ACID', 'OTHER'];
    const pickStr = (v) => (typeof v === 'string' ? v.slice(0, 2000) : null);
    const pickDose = (d) => {
      if (!d || typeof d !== 'object') return null;
      const v = Number(d.value);
      if (!Number.isFinite(v) || v < 0) return null;
      const u = typeof d.unit === 'string' ? d.unit.slice(0, 24) : '';
      if (!u) return null;
      return { value: v, unit: u };
    };
    out.nutrient_dose = {
      kind: validKinds.includes(nd.kind) ? nd.kind : 'OTHER',
      rda: pickDose(nd.rda),
      ul: pickDose(nd.ul),
      rda_source: {
        ru: pickStr(nd.rda_source?.ru),
        en: pickStr(nd.rda_source?.en),
        es: pickStr(nd.rda_source?.es),
      },
      ul_source: {
        ru: pickStr(nd.ul_source?.ru),
        en: pickStr(nd.ul_source?.en),
        es: pickStr(nd.ul_source?.es),
      },
      toxicity_warning: {
        ru: pickStr(nd.toxicity_warning?.ru),
        en: pickStr(nd.toxicity_warning?.en),
        es: pickStr(nd.toxicity_warning?.es),
      },
      bolus_dosing_allowed: Boolean(nd.bolus_dosing_allowed),
      bolus_dosing_note: {
        ru: pickStr(nd.bolus_dosing_note?.ru),
        en: pickStr(nd.bolus_dosing_note?.en),
        es: pickStr(nd.bolus_dosing_note?.es),
      },
    };
  }
  if (Array.isArray(match.sources)) {
    out.sources = match.sources
      .filter((s) => s && typeof s === 'object')
      .map((s) => ({
        label: typeof s.label === 'string' ? s.label : '',
        url: safeUrl(s.url),
        type: typeof s.type === 'string' ? s.type : null,
        lastChecked: typeof s.lastChecked === 'string' ? s.lastChecked : null,
      }))
      .filter((s) => s.url);
  }
  if (match.interactions_note && typeof match.interactions_note === 'object') {
    out.interactions_note = match.interactions_note;
  }
  if (typeof match.interactions_note_en === 'string') {
    out.interactions_note_en = match.interactions_note_en;
  }
  out.evigradeUrl = safeUrl(match.evigradeUrl);
  return out;
}

async function loadHealthProfile() {
  try {
    // Health profile is GDPR Art. 9 special category data – keep it in
    // chrome.storage.local (device-only). Never use chrome.storage.sync
    // which would mirror the data through the user's Google account.
    const { healthProfile: hp = { pregnancy: false, lactation: false } } = await chrome.storage.local.get('healthProfile');
    healthProfile = hp;
  } catch (e) {
    healthProfile = { pregnancy: false, lactation: false };
  }
}

async function setHealthKind(kind, value) {
  healthProfile = { ...healthProfile, [kind]: value };
  try {
    await chrome.storage.local.set({ healthProfile });
  } catch (e) {}
  track('HEALTH_PROFILE_CHANGED', { target: `${kind}:${value ? 'on' : 'off'}` });
  render();
}

function render() {
  const i = I18N[currentLocale] || I18N.en;

  document.getElementById('logo').src = '../icons/icon48.png';
  document.getElementById('panelTitle').textContent = i.panelTitle;
  document.getElementById('disclaimerBar').textContent = i.disclaimer;
  document.getElementById('closeBtn').setAttribute('aria-label', i.close);
  document.getElementById('adverseBtn').textContent = i.adverse;
  document.getElementById('termsLink').textContent = i.termsLink;

  // Локализованные ссылки на legal-документы: EN → ../terms.html,
  // RU/ES → ../terms.ru.html / ../terms.es.html.
  const docSuffix = currentLocale === 'en' ? '' : `.${currentLocale}`;
  const sourcesLink = document.getElementById('sourcesLink');
  sourcesLink.textContent = i.sources;
  sourcesLink.href = `../about${docSuffix}.html`;
  document.getElementById('termsLink').href = `../terms${docSuffix}.html`;

  document.getElementById('closeBtn').onclick = () => {
    parent.postMessage({ type: 'EVIGRADE_MEDS_CLOSE' }, '*');
  };

  setupAdversePopover(i);

  const content = document.getElementById('content');
  content.innerHTML = '';

  const titleDiv = document.createElement('div');
  titleDiv.innerHTML = `
    <p class="product-title">${escapeHtml(i.productLabel)}</p>
    <p class="product-name">${escapeHtml(currentTitle)}</p>
  `;
  content.appendChild(titleDiv);

  if (!currentMatch) {
    const empty = document.createElement('div');
    empty.className = 'empty-state';
    empty.innerHTML = `
      <h2>${escapeHtml(i.notFoundTitle)}</h2>
      <p>${escapeHtml(i.notFoundDesc)}</p>
      <a class="search-link" target="_blank" rel="noopener noreferrer" href="https://www.evigrade.com/${currentLocale}/search?q=${encodeURIComponent(currentTitle)}">${escapeHtml(i.searchOnSite)} →</a>
    `;
    content.appendChild(empty);
    renderManualSearch(content, i);
    renderPerCardDisclaimer(content, i);
    return;
  }

  renderIngredientTabs(content, i);
  renderIngredientCard(content, currentMatch, i);
  renderIndications(content, currentMatch, i);
  renderNutrientDose(content, currentMatch, i);
  renderConditionalSections(content, currentMatch, i);
  renderWaitlistTeaser(content, i);
  renderSources(content, currentMatch, i);
  renderInteractions(content, currentMatch, i);
  renderFullLink(content, currentMatch, i);
  renderHealthToggleRow(content, currentMatch, i);
  renderSelfMedicationDisclaimer(content, currentMatch, i);
  renderManualSearch(content, i);
  renderCosmeticsPromo(content, i);
  renderPerCardDisclaimer(content, i);
}

// Cross-promo для cosmetics-extension. Показываем раз в 5 открытий overlay,
// пока юзер не закрыл явно. State в chrome.storage.local.
function renderCosmeticsPromo(parent, i) {
  try {
    chrome.storage?.local?.get?.(['evgCosmPromoShown', 'evgCosmPromoDismissed'], (st) => {
      if (st?.evgCosmPromoDismissed === true) return;
      const shown = Number(st?.evgCosmPromoShown) || 0;
      chrome.storage.local.set({ evgCosmPromoShown: shown + 1 });
      if (shown % 5 !== 0) return;
      const promo = document.createElement('div');
      promo.style.cssText = 'margin:12px 0;padding:10px 12px;background:#f0fdfa;border:1px solid #5eead4;border-radius:8px;font-size:13px;color:#0f766e;display:flex;justify-content:space-between;align-items:center;gap:10px;flex-wrap:wrap';
      const url = 'https://chromewebstore.google.com/detail/evigrade/ffipaidpbkbfhdhmijhncneohohbhfml';
      promo.innerHTML = `
        <div style="flex:1;min-width:160px">
          <div style="font-weight:600;color:#134e4a">${escapeHtml(i.cosmeticsPromoTitle)}</div>
          <div style="margin-top:2px;color:#0f766e">${escapeHtml(i.cosmeticsPromoDesc)}</div>
        </div>
        <div style="display:flex;gap:6px;align-items:center">
          <a href="${url}" target="_blank" rel="noopener noreferrer" style="background:#0d9488;color:#fff;padding:6px 10px;border-radius:6px;text-decoration:none;font-weight:600;white-space:nowrap" data-evg-cosm-cta>${escapeHtml(i.cosmeticsPromoCta)}</a>
          <button type="button" aria-label="close" style="background:transparent;border:0;cursor:pointer;color:#0f766e;font-size:16px;line-height:1;padding:0 4px" data-evg-cosm-close>×</button>
        </div>
      `;
      parent.appendChild(promo);
      promo.querySelector('[data-evg-cosm-cta]')?.addEventListener('click', () => {
        try { chrome.runtime.sendMessage({ type: 'TRACK_EVENT', payload: { type: 'PRO_CTA_CLICK', target: 'cosmetics_ext_promo' } }); } catch (_e) {}
      });
      promo.querySelector('[data-evg-cosm-close]')?.addEventListener('click', () => {
        chrome.storage.local.set({ evgCosmPromoDismissed: true });
        promo.remove();
      });
    });
  } catch (_e) {
    // chrome.storage недоступен в исключительных случаях — промо просто не покажется
  }
}

function renderWaitlistTeaser(parent, i) {
  const div = document.createElement('div');
  div.className = 'waitlist-teaser';
  div.innerHTML = `
    <span class="wl-badge">${escapeHtml(i.waitlistBadge)}</span>
    <h3>${escapeHtml(i.waitlistTitle)}</h3>
    <p>${escapeHtml(i.waitlistDesc)}</p>
    <button class="waitlist-cta" type="button">${escapeHtml(i.waitlistCta)} →</button>
    <form class="waitlist-form" autocomplete="off">
      <input type="email" name="email" placeholder="${escapeAttr(i.waitlistEmailPlaceholder)}" required>
      <label class="wl-consent">
        <input type="checkbox" name="consent" required>
        <span>${i.waitlistConsent}</span>
      </label>
      <div class="wl-note">${escapeHtml(i.waitlistNote)}</div>
      <button class="wl-submit" type="submit">${escapeHtml(i.waitlistSubmit)}</button>
      <div class="waitlist-error" hidden></div>
    </form>
    <div class="waitlist-success">${escapeHtml(i.waitlistSuccess)}</div>
  `;

  // Локализуем href для ссылок [data-doc="privacy"] внутри consent-надписи.
  const wlDocSuffix = currentLocale === 'en' ? '' : `.${currentLocale}`;
  div.querySelectorAll('a[data-doc="privacy"]').forEach(a => {
    a.href = `../privacy${wlDocSuffix}.html`;
  });

  const cta = div.querySelector('.waitlist-cta');
  const form = div.querySelector('.waitlist-form');
  const success = div.querySelector('.waitlist-success');
  const errorEl = div.querySelector('.waitlist-error');

  cta.addEventListener('click', () => {
    cta.style.display = 'none';
    form.classList.add('visible');
    track('WAITLIST_INTERACTIONS_CLICK', { target: 'interactions-checker' });
    form.querySelector('input[name="email"]').focus();
  });

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    errorEl.hidden = true;
    const emailInput = form.querySelector('input[name="email"]');
    const consentInput = form.querySelector('input[name="consent"]');
    const submitBtn = form.querySelector('.wl-submit');
    const email = String(emailInput.value || '').trim();

    if (!/^[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}$/i.test(email)) {
      errorEl.textContent = i.waitlistErrorInvalid;
      errorEl.hidden = false;
      return;
    }

    if (!consentInput || !consentInput.checked) {
      errorEl.textContent = i.waitlistConsentRequired;
      errorEl.hidden = false;
      return;
    }

    submitBtn.disabled = true;
    try {
      const result = await chrome.runtime.sendMessage({
        type: 'WAITLIST_SUBMIT',
        payload: { email, feature: 'interactions-checker' }
      });
      if (result?.ok) {
        form.style.display = 'none';
        success.classList.add('visible');
        success.style.display = 'block';
      } else {
        errorEl.textContent = result?.reason === 'invalid_email' ? i.waitlistErrorInvalid : i.waitlistErrorGeneric;
        errorEl.hidden = false;
        submitBtn.disabled = false;
      }
    } catch (err) {
      errorEl.textContent = i.waitlistErrorGeneric;
      errorEl.hidden = false;
      submitBtn.disabled = false;
    }
  });

  parent.appendChild(div);
}

function renderIngredientTabs(parent, _i) {
  if (currentMatches.length <= 1) return;
  const wrap = document.createElement('div');
  wrap.className = 'ingredient-tabs';
  currentMatches.forEach((m, idx) => {
    const name = m.names?.[currentLocale]?.[0] || m.names?.en?.[0] || m.slug;
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'ingredient-tab' + (idx === currentActiveIndex ? ' is-active' : '');
    btn.textContent = name;
    btn.title = name;
    btn.addEventListener('click', () => {
      if (idx === currentActiveIndex) return;
      currentActiveIndex = idx;
      currentMatch = currentMatches[idx];
      track('TAB_SWITCH', { target: currentMatch.slug, index: idx });
      render();
    });
    wrap.appendChild(btn);
  });
  parent.appendChild(wrap);
}

function renderIngredientCard(parent, match, i) {
  const name = pickName(match);
  const latin = match.names?.en?.find(n => /^[A-Z][a-z]+ [a-z]+/.test(n));
  const card = document.createElement('div');
  card.className = 'ingredient-card';
  card.innerHTML = `
    <h2>${escapeHtml(name)}</h2>
    ${latin && latin !== name ? `<div class="latin">${escapeHtml(latin)}</div>` : ''}
    ${match.category_en ? `<span class="category">${escapeHtml(match.category_en)}</span>` : ''}
  `;
  parent.appendChild(card);
}

function renderIndications(parent, match, i) {
  const items = Array.isArray(match.top_indications) ? match.top_indications : [];
  if (!items.length) return;

  const TOP_N = 3;
  const shown = items.slice(0, TOP_N);
  const total = typeof match.indications_total === 'number' ? match.indications_total : items.length;
  const moreCount = Math.max(0, total - shown.length);

  const section = document.createElement('div');
  section.className = 'section indications-section';
  section.innerHTML = `<h3>${escapeHtml(i.indicationsTitle)}</h3>`;

  const list = document.createElement('ul');
  list.className = 'indications-list';

  shown.forEach((it) => {
    const name = it.condition_name?.[currentLocale] || it.condition_name?.en || it.condition_slug;
    const summary = it.summary?.[currentLocale] || it.summary?.en || '';
    const tier = it.evidence_tier || 'D';
    const badgeLabel = i.evidenceBadge[tier] || tier;
    const li = document.createElement('li');
    li.className = `indication-row tier-${tier}`;
    li.innerHTML = `
      <div class="indication-head">
        <span class="indication-name">${escapeHtml(name)}</span>
        <span class="evidence-badge badge-${tier}" title="${escapeAttr(badgeLabel)}">${escapeHtml(tier)}</span>
      </div>
      ${summary ? `<p class="indication-summary">${escapeHtml(summary)}</p>` : ''}
    `;
    list.appendChild(li);
  });
  section.appendChild(list);

  if (moreCount > 0 && match.evigradeUrl) {
    const more = document.createElement('a');
    more.className = 'indications-more';
    more.href = match.evigradeUrl.replace('/en/', `/${currentLocale === 'en' ? 'en' : currentLocale}/`);
    more.target = '_blank';
    more.rel = 'noopener noreferrer';
    more.textContent = typeof i.indicationsMore === 'function' ? i.indicationsMore(moreCount) : `+${moreCount}`;
    section.appendChild(more);
  }

  parent.appendChild(section);
}

function renderNutrientDose(parent, match, i) {
  const nd = match.nutrient_dose;
  if (!nd) return;

  const isFatSoluble = nd.kind === 'FAT_SOLUBLE_VITAMIN';
  const isFattyAcid = nd.kind === 'FATTY_ACID';
  const isMineralTrace = nd.kind === 'MINERAL_TRACE';

  let kindTag = '';
  if (isFatSoluble) kindTag = i.doseFatSolubleTag;
  else if (isFattyAcid) kindTag = i.doseFattyAcidTag;
  else if (isMineralTrace) kindTag = i.doseMineralTag;

  // Жирорастворимые и микроэлементы с узким окном → красная плашка.
  // Жирные кислоты и водорастворимые → жёлтая (внимание, не паника).
  const severity = isFatSoluble || isMineralTrace ? 'red' : 'amber';

  const section = document.createElement('div');
  section.className = `section dose-section dose-${severity}`;

  const rdaStr = nd.rda ? `${formatDoseNumber(nd.rda.value)} ${escapeHtml(nd.rda.unit)}` : '—';
  const ulStr = nd.ul
    ? `${formatDoseNumber(nd.ul.value)} ${escapeHtml(nd.ul.unit)}`
    : escapeHtml(i.doseUlNotSet);
  const rdaSource = nd.rda_source?.[currentLocale] || nd.rda_source?.en;
  const ulSource = nd.ul_source?.[currentLocale] || nd.ul_source?.en;
  const toxicity = nd.toxicity_warning?.[currentLocale] || nd.toxicity_warning?.en;
  const bolus = nd.bolus_dosing_allowed
    ? nd.bolus_dosing_note?.[currentLocale] || nd.bolus_dosing_note?.en
    : null;

  section.innerHTML = `
    <h3>${escapeHtml(i.doseSection)}</h3>
    ${kindTag ? `<div class="dose-tag">${escapeHtml(kindTag)}</div>` : ''}
    <div class="dose-numbers">
      <div class="dose-row">
        <span class="dose-label">${escapeHtml(i.doseRdaLabel)}</span>
        <span class="dose-value">${rdaStr}</span>
      </div>
      <div class="dose-row dose-row-ul">
        <span class="dose-label">${escapeHtml(i.doseUlLabel)}</span>
        <span class="dose-value">${ulStr}</span>
      </div>
    </div>
    ${rdaSource || ulSource ? `
      <div class="dose-sources">
        ${rdaSource ? `<p class="dose-source-line"><span class="dose-source-tag">${escapeHtml(i.doseSourceLabel)}:</span> ${escapeHtml(rdaSource)}</p>` : ''}
        ${ulSource && ulSource !== rdaSource ? `<p class="dose-source-line"><span class="dose-source-tag">UL:</span> ${escapeHtml(ulSource)}</p>` : ''}
      </div>
    ` : ''}
    ${toxicity ? `
      <div class="dose-toxicity">
        <h4>${escapeHtml(i.doseToxicityHeader)}</h4>
        <p>${escapeHtml(toxicity)}</p>
      </div>
    ` : ''}
    ${bolus ? `
      <div class="dose-bolus">
        <h4>${escapeHtml(i.doseBolusHeader)}</h4>
        <p>${escapeHtml(bolus)}</p>
      </div>
    ` : ''}
  `;
  parent.appendChild(section);
}

function formatDoseNumber(v) {
  if (!Number.isFinite(v)) return '—';
  if (v >= 100) return Math.round(v).toLocaleString();
  if (v >= 1) return v.toString();
  return v.toFixed(2);
}

function renderSelfMedicationDisclaimer(parent, match, i) {
  // Показываем только для веществ с nutrient_dose – чтобы не было шума
  // на обычных лекарствах, где это не главный месседж.
  if (!match.nutrient_dose) return;
  const div = document.createElement('div');
  div.className = 'self-med-disclaimer';
  div.innerHTML = `<p>${escapeHtml(i.selfMedicationDisclaimer)}</p>`;
  parent.appendChild(div);
}

function renderConditionalSections(parent, match, i) {
  const showPreg = healthProfile.pregnancy && match.pregnancy;
  const showLact = healthProfile.lactation && match.lactation;
  if (!showPreg && !showLact) return;

  const section = document.createElement('div');
  section.className = 'section';

  if (showPreg) section.appendChild(renderPregRow(i.pregnancy, match.pregnancy, i, 'pregnancy'));
  if (showLact) section.appendChild(renderPregRow(i.lactation, match.lactation, i, 'lactation'));

  parent.appendChild(section);
}

function renderPregRow(label, data, i, kind) {
  const row = document.createElement('div');
  row.className = `preg-row status-${data.status}`;
  const statusLabel = i.pregStatus[data.status] || data.status;
  row.innerHTML = `
    <div class="preg-row-header">
      <span class="preg-label">${escapeHtml(label)}</span>
      <button class="preg-dismiss" type="button" data-dismiss="${kind}" aria-label="${escapeHtml(i.close)}">×</button>
    </div>
    <div class="preg-status-line"><strong>${escapeHtml(statusLabel)}</strong></div>
    ${data.source_url ? `<a class="preg-source-link" href="${escapeAttr(data.source_url)}" target="_blank" rel="noopener">${escapeHtml(i.viewSource)} →</a>` : ''}
  `;
  row.querySelector('.preg-dismiss')?.addEventListener('click', () => setHealthKind(kind, false));
  return row;
}

function renderHealthToggleRow(parent, match, i) {
  const canPreg = match.pregnancy;
  const canLact = match.lactation;
  if (!canPreg && !canLact) return;

  const showPregBtn = canPreg && !healthProfile.pregnancy;
  const showLactBtn = canLact && !healthProfile.lactation;
  if (!showPregBtn && !showLactBtn) return;

  const row = document.createElement('div');
  row.className = 'health-toggle';
  row.innerHTML = `
    <p class="health-toggle-hint">${escapeHtml(i.healthHint)}</p>
    <div class="health-toggle-row">
      ${showPregBtn ? `<button class="health-toggle-btn" data-kind="pregnancy" type="button">+ ${escapeHtml(i.addPregnancy)}</button>` : ''}
      ${showLactBtn ? `<button class="health-toggle-btn" data-kind="lactation" type="button">+ ${escapeHtml(i.addLactation)}</button>` : ''}
    </div>
  `;
  row.querySelectorAll('.health-toggle-btn').forEach(btn => {
    btn.addEventListener('click', () => setHealthKind(btn.dataset.kind, true));
  });
  parent.appendChild(row);
}

function renderSources(parent, match, i) {
  if (!match.sources || !match.sources.length) return;
  const section = document.createElement('div');
  section.className = 'section';
  section.innerHTML = `<h3>${escapeHtml(i.sources)}</h3>`;
  const list = document.createElement('ul');
  list.className = 'sources-list';
  match.sources.forEach(src => {
    const li = document.createElement('li');
    const typeLabel = i.sourceType[src.type] || src.type;
    li.innerHTML = `
      <a href="${escapeAttr(src.url)}" target="_blank" rel="noopener">${escapeHtml(src.label)}</a>
      <span class="source-type">${escapeHtml(typeLabel)}</span>
      ${src.lastChecked ? `<span class="checked">${escapeHtml(formatLastChecked(src.lastChecked))}</span>` : ''}
    `;
    list.appendChild(li);
  });
  section.appendChild(list);
  parent.appendChild(section);
}

function formatLastChecked(iso) {
  if (currentLocale === 'ru') return `Проверено ${iso}`;
  if (currentLocale === 'es') return `Verificado ${iso}`;
  return `Last verified ${iso}`;
}

function renderInteractions(parent, match, i) {
  const noteObj = match.interactions_note;
  const note = noteObj?.[currentLocale] || noteObj?.en || match.interactions_note_en;
  if (!note) return;
  const div = document.createElement('div');
  div.className = 'interactions';
  div.innerHTML = `
    <strong>${escapeHtml(i.interactions)}</strong>
    <em class="interactions-disclaimer">${escapeHtml(i.interactionsDisclaimer)}</em>
    <span>${escapeHtml(note)}</span>
  `;
  parent.appendChild(div);
}

function renderFullLink(parent, match, i) {
  if (!match.evigradeUrl) return;
  const url = match.evigradeUrl.replace('/en/', `/${currentLocale === 'en' ? 'en' : currentLocale}/`);
  const a = document.createElement('a');
  a.className = 'full-card-link';
  a.href = url;
  a.target = '_blank';
  a.rel = 'noopener noreferrer';
  a.textContent = i.seeOnEvigrade;
  parent.appendChild(a);
}

function renderManualSearch(parent, i) {
  const section = document.createElement('div');
  section.className = 'manual-search';
  section.innerHTML = `
    <h3>${escapeHtml(i.searchBoxLabel)}</h3>
    <p class="manual-search-hint">${escapeHtml(i.searchBoxHint)}</p>
    <form class="manual-search-form">
      <input type="text" class="manual-search-input" placeholder="${escapeAttr(i.searchBoxPlaceholder)}" autocomplete="off" maxlength="120" />
      <button type="submit" class="manual-search-submit">${escapeHtml(i.searchBoxSubmit)}</button>
    </form>
    <p class="manual-search-error" hidden></p>
  `;
  const form = section.querySelector('.manual-search-form');
  const input = section.querySelector('.manual-search-input');
  const errEl = section.querySelector('.manual-search-error');

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const q = (input.value || '').trim();
    errEl.hidden = true;
    if (q.length < 3) {
      errEl.textContent = i.searchBoxTooShort;
      errEl.hidden = false;
      return;
    }
    section.classList.add('is-loading');
    // Hand off to detector via parent postMessage. Detector calls
    // /api/meds/lookup through background.js and posts the result
    // back as a normal EVIGRADE_MEDS_RENDER message. If the server
    // says match=null we surface a localised "no match" line below
    // the form (handled by parent reply: locale stays the same,
    // currentMatch becomes null, but currentTitle is the user's
    // query so the empty state shows it back to them).
    parent.postMessage({ type: 'EVIGRADE_MEDS_MANUAL_SEARCH', query: q }, '*');
  });
  parent.appendChild(section);
}

function renderPerCardDisclaimer(parent, i) {
  const div = document.createElement('div');
  div.className = 'per-card-disclaimer';
  div.innerHTML = `<strong>⚠</strong> ${escapeHtml(i.perCard)}`;
  parent.appendChild(div);
}

function pickName(match) {
  return match.names?.[currentLocale]?.[0] || match.names?.en?.[0] || match.slug;
}

function pickReportingRegion() {
  const uiLang = (navigator.language || 'en').toLowerCase();
  if (uiLang.startsWith('ru')) return 'RU';
  if (uiLang.startsWith('es')) return 'ES';
  if (uiLang.startsWith('en-gb')) return 'UK';
  if (uiLang.startsWith('en')) return 'US';
  return 'EU';
}

async function getPreferredRegion() {
  try {
    const { region } = await chrome.storage.sync.get('region');
    if (region && region !== 'auto' && ADVERSE_LINKS[region]) return region;
  } catch (e) {}
  return pickReportingRegion();
}

function setupAdversePopover(i) {
  const btn = document.getElementById('adverseBtn');
  const pop = document.getElementById('adversePopover');
  if (!btn || !pop) return;

  pop.innerHTML = '';
  const title = document.createElement('div');
  title.className = 'adverse-popover-title';
  title.textContent = i.adversePopTitle;
  pop.appendChild(title);

  getPreferredRegion().then(suggested => {
    const order = [suggested, 'US', 'EU', 'ES', 'UK', 'RU'].filter((v, idx, arr) => arr.indexOf(v) === idx);
    order.forEach(code => {
      const region = i.adverseRegions[code];
      if (!region) return;
      const opt = document.createElement('button');
      opt.type = 'button';
      opt.className = 'adverse-option' + (code === suggested ? ' suggested' : '');
      opt.dataset.region = code;
      opt.innerHTML = `${escapeHtml(region.country)}<span class="opt-authority">${escapeHtml(region.authority)}</span>`;
      opt.addEventListener('click', () => {
        track('ADVERSE_REPORT_CLICK', { target: code.toLowerCase() });
        window.open(ADVERSE_LINKS[code], '_blank');
        closePopover();
      });
      pop.appendChild(opt);
    });
  });

  btn.onclick = (e) => {
    e.stopPropagation();
    const open = !pop.hidden;
    if (open) closePopover(); else openPopover();
  };

  document.addEventListener('click', closePopover);
}

function openPopover() {
  const pop = document.getElementById('adversePopover');
  const btn = document.getElementById('adverseBtn');
  if (!pop || !btn) return;
  pop.hidden = false;
  btn.setAttribute('aria-expanded', 'true');
}

function closePopover() {
  const pop = document.getElementById('adversePopover');
  const btn = document.getElementById('adverseBtn');
  if (!pop || !btn) return;
  pop.hidden = true;
  btn.setAttribute('aria-expanded', 'false');
}

function escapeHtml(s) {
  if (s == null) return '';
  return String(s).replace(/[&<>"']/g, m => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[m]));
}

function escapeAttr(s) {
  return escapeHtml(s);
}
