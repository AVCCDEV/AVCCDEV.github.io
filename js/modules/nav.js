/**
 * nav.js — header behaviour: the scrolled state of the sticky bar.
 *
 * This used to also run the off-canvas mobile menu and mark the nav link
 * matching the current URL with aria-current="page". Both went out on
 * 2026-08-27: the bar is now two buttons that never collapse, and neither
 * points at a page — they scroll to #featured and #connect on the landing
 * page. If a real second page ever returns to the bar, the aria-current
 * marker is worth restoring from git history rather than rewriting.
 */

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

export function initNav() {
  initScrolledState();
}
