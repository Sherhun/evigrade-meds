/**
 * Telemetry contract for Evigrade Meds.
 *
 * Mirror of Meds-specific endpoints on evigrade.com. Loaded as plain JS:
 *   - <script src="api-contract.js"> in popup.html / welcome.html / etc.
 *   - importScripts("api-contract.js") in background.js (MV3 worker)
 *
 * All accessible via globalThis.evgMedsContract.
 */

(() => {
  const EXTENSION_API_VERSION = 1;
  const API_VERSION_HEADER = "X-Evigrade-API-Version";

  const SITE_URL = "https://www.evigrade.com";
  const EXTENSION_ID = "meds";

  // Whitelisted event types — single source of truth. Adding a new type
  // also requires extending the Prisma enum on the backend.
  const EXTENSION_EVENT_TYPES = Object.freeze(
    new Set([
      // Lifecycle
      "INSTALL",
      "UPDATE",
      "UNINSTALL_FEEDBACK",
      // Once per calendar day per install, fired from chrome.alarms. Without
      // it an install that is alive but idle looks exactly like a removed one.
      "HEARTBEAT",
      // Onboarding
      "WELCOME_OPENED",
      "WELCOME_LEGAL_ACCEPTED",
      "WELCOME_HEALTH_TOGGLED",
      "WELCOME_CTA",
      // Surfaces
      "POPUP_OPEN",
      "PANEL_SHOWN",
      "FAB_SHOWN",
      // Core value moment
      "SCAN",
      "MATCH_FOUND",
      "NO_MATCH",
      // Outbound clicks
      "PANEL_CTA_CLICK",
      "PRO_CTA_CLICK",
      "ADVERSE_REPORT_CLICK",
      "AUTH_LOGIN_CLICK",
      // Pro/waitlist (paid features in research mode)
      "WAITLIST_INTERACTIONS_CLICK",
      "WAITLIST_EMAIL_SUBMITTED",
      // Customization signals
      "LANG_SWITCH",
      "FILTERS_CHANGED",
      "HEALTH_PROFILE_CHANGED",
      // Diagnostics
      "ERROR",
    ]),
  );

  // Retailers we ship selectors for.
  const EXTENSION_STORES = Object.freeze(
    new Set([
      "iherb",
      "amazon",
      "vitaminshoppe",
      // ES online pharmacies and parafarmacia
      "mifarma",
      "promofarma",
      "dosfarma",
      "druni",
      // RU online pharmacies and marketplaces
      "aptekaru",
      "eapteka",
      "zdravcity",
      "wildberries",
      "ozon",
      "test",
    ]),
  );

  const SUBSCRIPTION_TIERS = Object.freeze(new Set(["FREE", "PRO", "PROFI"]));

  function checkApiVersion(headers) {
    try {
      const v = parseInt(headers.get(API_VERSION_HEADER), 10);
      if (!Number.isFinite(v)) return { outdated: false };
      return { outdated: v > EXTENSION_API_VERSION };
    } catch {
      return { outdated: false };
    }
  }

  globalThis.evgMedsContract = {
    EXTENSION_API_VERSION,
    API_VERSION_HEADER,
    SITE_URL,
    EXTENSION_ID,
    EXTENSION_EVENT_TYPES,
    EXTENSION_STORES,
    SUBSCRIPTION_TIERS,
    EVENT_URL: `${SITE_URL}/api/extension/event`,
    WAITLIST_URL: `${SITE_URL}/api/extension/waitlist`,
    HEALTH_PROFILE_URL: `${SITE_URL}/api/meds/health-profile`,
    checkApiVersion,
  };
})();
