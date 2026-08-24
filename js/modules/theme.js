/**
 * theme.js — light/dark switching.
 *
 * Three states: "light", "dark", or no stored value (follow the OS).
 * The stored value is applied by the tiny inline script in <head> before
 * first paint; this module only wires up the toggle button and keeps the
 * page in sync when the OS preference changes.
 */

const STORAGE_KEY = "av-theme";

/** Reads the stored choice. Storage can throw in private mode — never let it break the page. */
function storedTheme() {
  try {
    const value = localStorage.getItem(STORAGE_KEY);
    return value === "light" || value === "dark" ? value : null;
  } catch {
    return null;
  }
}

function persistTheme(theme) {
  try {
    localStorage.setItem(STORAGE_KEY, theme);
  } catch {
    /* Storage unavailable — the toggle still works for this page view. */
  }
}

/** What the user is actually looking at right now, stored choice or not. */
function activeTheme() {
  const explicit = document.documentElement.dataset.theme;
  if (explicit === "light" || explicit === "dark") return explicit;
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

function applyTheme(theme) {
  document.documentElement.dataset.theme = theme;
}

export function initTheme() {
  const toggle = document.querySelector("[data-theme-toggle]");

  const syncLabel = () => {
    if (!toggle) return;
    const next = activeTheme() === "dark" ? "light" : "dark";
    toggle.setAttribute("aria-label", `Switch to ${next} theme`);
    toggle.setAttribute("title", `Switch to ${next} theme`);
  };

  toggle?.addEventListener("click", () => {
    const next = activeTheme() === "dark" ? "light" : "dark";
    applyTheme(next);
    persistTheme(next);
    syncLabel();
  });

  // Follow the OS only while the user has made no explicit choice.
  window
    .matchMedia("(prefers-color-scheme: dark)")
    .addEventListener("change", () => {
      if (!storedTheme()) syncLabel();
    });

  syncLabel();
}
