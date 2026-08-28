/**
 * main.js — the site's single entry point.
 *
 * Loaded once per page as <script type="module" src="/js/main.js" defer>.
 * Every feature lives in its own file under js/modules/ and exports one
 * init function; this file's only job is to call them. Each init is a no-op
 * when its markup is absent, so the same bundle serves every page.
 */

import { initTheme } from "./modules/theme.js";
import { initNav } from "./modules/nav.js";
import { initReveal } from "./modules/reveal.js";
import { initLoopVideo } from "./modules/loopVideo.js";
import { initHeroVideo } from "./modules/heroVideo.js";
import { initScrollHint } from "./modules/scrollHint.js";
import { initConnectBand } from "./modules/connectBand.js";
import { initContactForm } from "./modules/contactForm.js";
import { initRelatedWork } from "./modules/relatedWork.js";

/** Keeps the footer copyright year correct without an annual edit. */
function initCurrentYear() {
  const year = String(new Date().getFullYear());
  document.querySelectorAll("[data-current-year]").forEach((el) => {
    el.textContent = year;
  });
}

function boot() {
  initTheme();
  initNav();
  initReveal();
  initLoopVideo();
  initHeroVideo();
  initScrollHint();
  initRelatedWork();
  // Order matters: the band builds the form, contactForm.js then binds to it.
  initConnectBand();
  initContactForm();
  initCurrentYear();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", boot, { once: true });
} else {
  boot();
}
