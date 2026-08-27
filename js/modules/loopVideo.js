/**
 * loopVideo.js — drives the silent, autoplaying clips that replace GIFs.
 *
 * Mark up with data-loop-video on a <video muted loop playsinline>. The HTML
 * deliberately does NOT carry the autoplay attribute: letting the browser
 * autoplay every clip on load means two 1080p loops decoding off-screen on a
 * phone. Playback is driven from here instead, so a clip runs only while it
 * is actually visible.
 *
 * With JS disabled the video simply sits on its poster frame, which is why
 * every loop needs a good one.
 */

/**
 * Autoplay can be refused even when muted — iOS Low Power Mode is the common
 * case. play() rejects, and rather than leave a dead poster we hand the
 * visitor real controls so the clip is still watchable.
 */
function revealControls(video) {
  video.controls = true;
  video.dataset.loopVideo = "fallback";
}

export function initLoopVideo() {
  const videos = document.querySelectorAll("[data-loop-video]");
  if (!videos.length) return;

  // A looping clip is motion the visitor did not ask for. Reduced motion means
  // it stays on its poster until they choose to play it.
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduced) {
    videos.forEach(revealControls);
    return;
  }

  if (!("IntersectionObserver" in window)) {
    videos.forEach(revealControls);
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const video = entry.target;

        // Once the browser has refused us, stop fighting it — the visitor now
        // has controls and driving play() from here would only take them away.
        if (video.dataset.loopVideo === "fallback") return;

        if (entry.isIntersecting) {
          const played = video.play();
          // Older browsers return undefined rather than a promise.
          if (played && typeof played.catch === "function") {
            played.catch(() => revealControls(video));
          }
        } else {
          video.pause();
        }
      });
    },
    // A little of the clip is enough to start it; this also keeps a loop that
    // is only half on screen from stopping and starting as the visitor scrolls.
    { threshold: 0.25 }
  );

  videos.forEach((video) => observer.observe(video));
}
