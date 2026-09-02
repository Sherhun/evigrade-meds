const EXAMPLES = [
  'Now Foods, Ashwagandha, 450 mg, 90 Veg Capsules',
  'NutriCost Creatine Monohydrate Powder, Unflavored, 500g',
  'Nature Made CoQ10 200 mg, 80 Softgels',
  'Tru Niagen Nicotinamide Riboside 300 mg, 30 Capsules',
  'Pure Encapsulations Magnesium Glycinate, 180 Capsules',
  'Natrol Melatonin 5 mg, Fast Dissolve Tablets',
  'NatureWise Vitamin D3 5,000 IU, 360 Softgels',
  'Nordic Naturals Ultimate Omega, 1280 mg Omega-3, 120 Softgels',
  'Solaray Saw Palmetto Berry, 580 mg, 100 VegCaps',
  'NOW Foods L-Theanine 200 mg, 60 Veg Capsules',
  'Unknown supplement, no match expected'
];

function fillExamples() {
  const container = document.getElementById('exampleButtons');
  EXAMPLES.forEach(ex => {
    const btn = document.createElement('button');
    btn.textContent = ex.split(',')[0].slice(0, 18) + '…';
    btn.title = ex;
    btn.addEventListener('click', () => {
      document.getElementById('titleInput').value = ex;
      runLookup();
    });
    container.appendChild(btn);
  });
}

async function runLookup() {
  const title = document.getElementById('titleInput').value.trim();
  const locale = document.getElementById('localeSelect').value;
  if (!title) return;

  renderLoading();

  try {
    const result = await chrome.runtime.sendMessage({
      type: 'LOOKUP',
      payload: { title, url: 'test://localhost', retailer: 'test', locale }
    });
    renderResult(title, result, locale);
  } catch (e) {
    renderError(e.message || String(e));
  }
}

function renderLoading() {
  document.getElementById('resultPanel').innerHTML = '<div class="result-empty">Loading…</div>';
}

function renderError(msg) {
  document.getElementById('resultPanel').innerHTML = `<div class="result-empty" style="color:#b91c1c;">Error: ${msg}</div>`;
}

function renderResult(title, result, locale) {
  const panel = document.getElementById('resultPanel');
  panel.innerHTML = '';
  const iframe = document.createElement('iframe');
  iframe.src = 'content/overlay.html';
  iframe.style.cssText = 'width:100%;height:560px;border:0;display:block;';
  panel.appendChild(iframe);
  iframe.addEventListener('load', () => {
    iframe.contentWindow.postMessage({
      type: 'EVIGRADE_MEDS_RENDER',
      title,
      match: result?.match || null,
      locale
    }, '*');
  });
}

document.addEventListener('DOMContentLoaded', () => {
  fillExamples();
  document.getElementById('runLookupBtn').addEventListener('click', runLookup);
  document.getElementById('titleInput').addEventListener('keydown', (e) => {
    if (e.key === 'Enter') runLookup();
  });
});
