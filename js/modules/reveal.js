/**
 * reveal.js — fades elements up as they scroll into view.
 *
 * Pofo does this with its "wow animate__fadeIn" classes and a library; this is
 * the same effect in ~20 lines with no dependency.
 *
 * Mark up with data-reveal. Optional data-reveal-delay="120" staggers a group.
 * Elements start hidden only when this module runs, so with JS disabled or
 * reduced motion on, content is simply visible from the start.
 */

export function initReveal() {
  const targets = document.querySelectorAll("[data-reveal]");
  if (!targets.length) return;

  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduced || !("IntersectionObserver" in window)) return;

  // Opt in to the hidden start state only now, so no-JS visitors never see a
  // blank page. The class is what css/pages/piece.css keys its transition off.
  document.documentElement.classList.add("has-reveal");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const delay = Number(entry.target.dataset.revealDelay) || 0;
        setTimeout(() => entry.target.classList.add("is-revealed"), delay);
        observer.unobserve(entry.target);
      });
    },
    // Trigger slightly before the element reaches the viewport edge.
    { rootMargin: "0px 0px -12% 0px", threshold: 0.05 }
  );

  targets.forEach((el) => observer.observe(el));
}
