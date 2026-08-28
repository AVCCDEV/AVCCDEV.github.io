/**
 * scrollHint.js — the landing page's opening nudge.
 *
 * A moment after the page settles, <main> slides up far enough to show a strip
 * of the work grid under the hero, drops back, bounces once smaller, and
 * stops. Adam asked for this on 2026-08-28: the hero fills the viewport, so a
 * visitor has no evidence there is a page under it beyond the scroll cue, and
 * the cue alone was not doing the work.
 *
 * Mark up with data-scroll-hint on the element that should move — <main> on
 * index.html, and nowhere else. No-op when the attribute is absent, so main.js
 * can call it on every page.
 *
 * IT MOVES THE CONTENT, NOT THE SCROLL POSITION. Animating window.scrollY
 * fights the user's own input, lands them somewhere they did not ask to be if
 * they scroll mid-flight, and pushes an entry into the browser's scroll
 * restoration. A transform does none of that: the scroll position never
 * changes, so there is nothing to fight over and nothing to undo. The header
 * is a sibling of <main>, not a child, so it stays put while the page moves
 * under it — which is what makes the nudge read as the page peeking rather
 * than as everything sliding.
 *
 * It gives up at the first sign of a real visitor. Anyone who wheels, taps,
 * presses a key or scrolls before or during the nudge has already worked out
 * that the page continues, and being shoved by the layout at that point is
 * worse than never being told.
 */

/* Long enough that the hero's own fade and the reel's first frames are done
   with, short enough to still read as part of the page opening. */
const START_DELAY = 1100;

/* How far to lift, in px. A proportion of the viewport so it stays a "strip"
   rather than a shove on a tall screen, capped so it does not become one on a
   very tall one. */
const PEEK_RATIO = 0.07;
const PEEK_MAX = 64;

export function initScrollHint() {
  const page = document.querySelector("[data-scroll-hint]");
  if (!page || typeof page.animate !== "function") return;

  // Motion preference is a hard no: this is decoration and nothing else.
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  // Only on a fresh, untouched arrival at the top. A deep link to #featured or
  // a restored scroll position means the visitor is already past the hero.
  if (window.location.hash || window.scrollY > 2) return;

  const peek = Math.round(Math.min(PEEK_MAX, window.innerHeight * PEEK_RATIO));

  // Nothing to hint at if the page does not actually continue below the fold.
  if (document.documentElement.scrollHeight <= window.innerHeight + peek) return;

  const events = ["wheel", "touchstart", "pointerdown", "keydown", "scroll"];
  let timer = 0;
  let animation = null;

  function stop() {
    events.forEach((type) => window.removeEventListener(type, stop));
    clearTimeout(timer);
    if (animation) animation.cancel();
  }

  events.forEach((type) => window.addEventListener(type, stop, { passive: true }));

  timer = setTimeout(() => {
    animation = page.animate(
      [
        { transform: "translateY(0)" },
        { transform: `translateY(${-peek}px)`, offset: 0.3 },
        { transform: "translateY(0)", offset: 0.62 },
        // The second, smaller dip is what makes it a bounce rather than a
        // single lurch — the same shape a physical spring settles on.
        { transform: `translateY(${-Math.round(peek * 0.38)}px)`, offset: 0.8 },
        { transform: "translateY(0)" },
      ],
      { duration: 1500, easing: "ease-in-out" }
    );

    // Tidy the listeners up once it has played. A cancel rejects this, which
    // is the stop() path and has already cleaned up.
    animation.finished.then(stop, () => {});
  }, START_DELAY);
}
