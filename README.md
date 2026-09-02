# Evigrade Meds

Chrome extension that recognises a medication or supplement on a store page and shows what regulators and systematic reviews actually say about it.

[Install from the Chrome Web Store](https://chromewebstore.google.com/detail/anmacpbhhffljikchkcdcbajiopanjei) · [evigrade.com](https://www.evigrade.com/en)

## What it does

A button appears on a supported product page. It opens a card with:

- The evidence rating for the active substance, with the primary sources it rests on and the date each was last checked
- Pregnancy and lactation rows, colour coded by status
- Known drug interactions for the substance
- A dose and toxicity block for fat soluble vitamins and omega-3, where the upper limit matters
- Separate tabs per component for multivitamins and combination products
- A link to the full card on evigrade.com

Manual search in the toolbar popup handles products the parser misses. Adverse event reporting links map to the user's region: FDA MedWatch, EudraVigilance, AEMPS notificaRAM, MHRA Yellow Card, Roszdravnadzor.

Interface and cards in English, Spanish and Russian, with the locale picked from the store's domain.

## Where it works

Store coverage lives in `host_permissions` in [manifest.json](manifest.json): iHerb, Amazon (com, es, co.uk, de), VitaminShoppe, the Spanish parafarmacias MiFarma, Atida, PromoFarma, DosFarma and Druni, plus Apteka.ru, Eapteka, Zdravcity, Wildberries and Ozon.

## Sources

Regulatory and systematic-review level only: FDA DailyMed, EMA, AEMPS CIMA, MHRA, Cochrane, NIH ODS, WHO, NICE, BNF, LactMed, and the Russian state register for RU cards. Where a claim has no such backing, the card says the evidence is absent rather than filling the gap with a plausible sentence.

## Regulatory position

An information retrieval tool. Not a medical device under FDA, MDR or MHRA rules, not a clinical decision support system, not medical advice, diagnosis, treatment, or drug advertising. Nothing in the extension works until the user accepts the terms on the first-run screen, and that gate is enforced in three places: the welcome screen, the content script, and the background worker.

## Privacy

Worth saying plainly, since this extension does send some things to the server:

- For a signed-in user, the pregnancy and lactation flags are synced through `PUT /api/meds/health-profile` so the site and the extension agree. For everyone else they stay in `chrome.storage`
- Telemetry records the slug of the matched card, the channel, and a daily heartbeat. It can be switched off in settings
- No browsing history, no page content beyond the product title and composition block

Full text: [evigrade.com/en/meds/privacy](https://www.evigrade.com/en/meds/privacy).

## How it is built

Manifest V3, no bundler, plain JavaScript, so the shipped package matches this source line for line.

| File | Role |
|---|---|
| `content/detector.js` | Recognises a product page in a supported store and waits for the title to render |
| `content/overlay.*` | The card itself, rendered inside an isolated iframe |
| `background.js` | Service worker: lookups, telemetry queue with retries, fallback host |
| `popup.js` | Toolbar panel, manual search, adverse event links |
| `settings.js` | Language, region, telemetry opt-out, reset of the legal acceptance |
| `api-contract.js` | Endpoint URLs and the API version constant |
| `test-page.html` | Offline QA page for rendering a card without a store page |

The substance database lives on the server, so an editorial correction reaches users without a store update.

## Local development

```sh
# Chrome → chrome://extensions → Developer mode → Load unpacked → this folder
# The welcome screen opens on install; accept, then open a supported product page
```

## Reporting a problem

A wrong card, a store the detector no longer recognises, a missing substance: open an issue with the product URL.

## License

Source is published for review and transparency. All rights reserved, no permission is granted to redistribute or publish derived extensions.
