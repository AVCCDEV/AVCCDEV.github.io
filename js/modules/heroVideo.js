/**
 * heroVideo.js — plays the landing hero's background reel.
 *
 * Sibling to loopVideo.js, and deliberately not the same module. A loop clip
 * is content: when autoplay is refused it gets real controls, because the
 * visitor came to watch it. The hero reel is decoration sitting behind the
 * page title — it is aria-hidden, it must never grow controls, and the
 * poster still underneath is a perfectly good landing page on its own.
 *
 * So this module's job is really the decision of whether to download 2.6 MB
 * at all. The markup carries no autoplay attribute and preload="none";
 * nothing is fetched until play() is called here. Every path that declines
 * simply returns, and the still remains the backdrop.
 */

/** Reasons to leave the still in place and never touch the network. */
function shouldSkip() {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return true;

  // Save-Data is an explicit "I am paying for these bytes". Slow effective
  // types are the same signal by measurement rather than by setting.
  const conn = navigator.connection;
  if (conn) {
    if (conn.saveData) return true;
    if (/(^|-)2g$/.test(conn.effectiveType || "")) return true;
  }

  return false;
}

export function initHeroVideo() {
  const video = document.querySelector("[data-hero-video]");
  if (!video) return;
  if (shouldSkip()) return;

  // Belt and braces: muted is what makes autoplay permissible at all, and the
  // attribute alone has been known to lose to a bfcache restore.
  video.muted = true;

  // Only fade the reel in once frames are actually on screen. Reveal on
  // "playing" rather than on the play() promise so a slow first segment shows
  // the still rather than a blank box.
  video.addEventListener(
    "playing",
    () => { video.dataset.heroVideo = "playing"; },
    { once: true }
  );

  const start = () => {
    const played = video.play();
    // Older browsers return undefined rather than a promise.
    if (played && typeof played.catch === "function") {
      // Refused (iOS Low Power Mode is the usual cause). The still stays, and
      // that is the whole fallback — a background plate needs no controls.
      played.catch(() => {});
    }
  };

  // Scrolling past the hero leaves a decode running behind the rest of the
  // page for nothing. Without IntersectionObserver, just play it.
  if (!("IntersectionObserver" in window)) {
    start();
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) start();
        else video.pause();
      });
    },
    // Any sliver of the hero counts: this is a full-viewport element, so a
    // threshold above 0 would stop it while it is still half visible.
    { threshold: 0 }
  );

  observer.observe(video);
}
