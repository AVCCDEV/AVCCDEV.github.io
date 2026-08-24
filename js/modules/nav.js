/**
 * nav.js — header behaviour: mobile menu, scrolled state, current-page marking.
 */

/** Opens/closes the off-canvas menu, keeping ARIA state and Escape handling honest. */
function initMobileMenu() {
  const toggle = document.querySelector("[data-nav-toggle]");
  const nav = document.querySelector("[data-nav]");
  if (!toggle || !nav) return;

  const setOpen = (open) => {
    toggle.setAttribute("aria-expanded", String(open));
    nav.classList.toggle("is-open", open);
  };

  toggle.addEventListener("click", () => {
    setOpen(toggle.getAttribute("aria-expanded") !== "true");
  });

  // Escape closes and returns focus to the button that opened the menu.
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && toggle.getAttribute("aria-expanded") === "true") {
      setOpen(false);
      toggle.focus();
    }
  });

  // Following a link inside the panel should close it.
  nav.addEventListener("click", (event) => {
    if (event.target.closest("a")) setOpen(false);
  });

  // Leaving the mobile breakpoint clears the open state so the desktop bar is clean.
  const mobile = window.matchMedia("(max-width: 48rem)");
  mobile.addEventListener("change", (event) => {
    if (!event.matches) setOpen(false);
  });
}

/** Adds .is-scrolled to the header once the page leaves the very top. */
function initScrolledState() {
  const header = document.querySelector("[data-site-header]");
  if (!header) return;

  // A sentinel at the top of the document is cheaper than a scroll listener.
  const sentinel = document.createElement("div");
  sentinel.setAttribute("aria-hidden", "true");
  sentinel.style.cssText = "position:absolute;top:0;height:1px;width:1px;";
  document.body.prepend(sentinel);

  new IntersectionObserver(
    ([entry]) => header.classList.toggle("is-scrolled", !entry.isIntersecting),
    { threshold: 0 }
  ).observe(sentinel);
}

/**
 * Marks the nav link matching the current URL with aria-current="page".
 * Doing it here means each page's markup stays identical — no per-page edits.
 */
function initCurrentLink() {
  const here = window.location.pathname.replace(/index\.html$/, "").replace(/\/$/, "");

  document.querySelectorAll("[data-nav] a[href]").forEach((link) => {
    const target = new URL(link.getAttribute("href"), window.location.href);
    if (target.origin !== window.location.origin) return;

    const path = target.pathname.replace(/index\.html$/, "").replace(/\/$/, "");
    if (path === here && !target.hash) link.setAttribute("aria-current", "page");
  });
}

export function initNav() {
  initMobileMenu();
  initScrolledState();
  initCurrentLink();
}
