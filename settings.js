const TELEMETRY_OPTOUT_KEY = 'evg_meds_telemetry_optout';

document.addEventListener('DOMContentLoaded', async () => {
  const languageSelect = document.getElementById('languageSelect');
  const regionSelect = document.getElementById('regionSelect');
  const analyticsToggle = document.getElementById('analyticsToggle');
  const pregnancyToggle = document.getElementById('pregnancyToggle');
  const lactationToggle = document.getElementById('lactationToggle');

  const syncStored = await chrome.storage.sync.get(['language', 'region']);
  // Health profile (pregnancy/lactation) is GDPR Art. 9 special category
  // data — read from local-only storage, never from sync.
  const localStored = await chrome.storage.local.get([TELEMETRY_OPTOUT_KEY, 'healthProfile']);

  languageSelect.value = syncStored.language || 'auto';
  regionSelect.value = syncStored.region || 'auto';
  analyticsToggle.checked = localStored[TELEMETRY_OPTOUT_KEY] !== true;
  const hp = localStored.healthProfile || { pregnancy: false, lactation: false };
  pregnancyToggle.checked = !!hp.pregnancy;
  lactationToggle.checked = !!hp.lactation;

  languageSelect.addEventListener('change', () => chrome.storage.sync.set({ language: languageSelect.value }));
  regionSelect.addEventListener('change', () => chrome.storage.sync.set({ region: regionSelect.value }));

  analyticsToggle.addEventListener('change', () => {
    chrome.storage.local.set({ [TELEMETRY_OPTOUT_KEY]: !analyticsToggle.checked });
  });

  async function persistHealth() {
    // GDPR Art. 9 special category data — local only.
    await chrome.storage.local.set({
      healthProfile: {
        pregnancy: pregnancyToggle.checked,
        lactation: lactationToggle.checked,
      },
    });
  }
  pregnancyToggle.addEventListener('change', persistHealth);
  lactationToggle.addEventListener('change', persistHealth);

  document.getElementById('resetLegalBtn').addEventListener('click', async () => {
    if (!confirm('Reset legal acceptance and show welcome screen again?')) return;
    await chrome.storage.sync.remove(['legalAcceptedAt', 'legalVersion', 'legalLocale']);
    chrome.tabs.create({ url: chrome.runtime.getURL('welcome.html') });
  });

  document.getElementById('clearDataBtn').addEventListener('click', async () => {
    if (!confirm('Clear all locally stored data? This cannot be undone.')) return;
    await chrome.storage.sync.clear();
    await chrome.storage.local.clear();
    alert('Local data cleared. The welcome screen will appear on next use.');
  });
});
