/**
 * lightbox.js — blows an image up over the page instead of leaving it.
 *
 * Mark up a link to the full-size file with data-lightbox, wrapping the
 * on-page <img>:
 *
 *   <a href="/assets/img/x/shot.webp" data-lightbox>
 *     <img src="/assets/img/x/shot.webp" alt="…" width="…" height="…">
 *   </a>
 *
 * Without JS the link still opens the file, so nothing is lost. With JS a
 * plain click opens it in a modal <dialog> instead; ctrl/cmd/shift/middle
 * click are left alone so "open in new tab" keeps working. Every
 * data-lightbox link on the page forms one sequence: arrow keys and the
 * prev/next buttons step through it. Esc, the close button, or a click on
 * the dark area closes it. No-op when the page has no data-lightbox links.
 *
 * The dialog is native <dialog> + showModal(), which brings focus trapping,
 * Esc and the inert page behind it for free.
 */

const ICONS = {
  close: '<path d="M6 6l12 12M18 6L6 18"/>',
  prev: '<path d="M15 5l-7 7 7 7"/>',
  next: '<path d="M9 5l7 7-7 7"/>',
};

function icon(name) {
  return `<svg viewBox="0 0 24 24" width="24" height="24" aria-hidden="true"
    fill="none" stroke="currentColor" stroke-width="2"
    stroke-linecap="round" stroke-linejoin="round">${ICONS[name]}</svg>`;
}

function buildDialog(multiple) {
  const dialog = document.createElement("dialog");
  dialog.className = "lightbox";
  dialog.setAttribute("aria-label", "Image viewer");
  dialog.innerHTML = `
    <figure class="lightbox__figure">
      <img class="lightbox__img" alt="">
    </figure>
    <button type="button" class="lightbox__button lightbox__close"
            aria-label="Close" data-lightbox-close>${icon("close")}</button>
    ${multiple ? `
    <button type="button" class="lightbox__button lightbox__prev"
            aria-label="Previous image" data-lightbox-step="-1">${icon("prev")}</button>
    <button type="button" class="lightbox__button lightbox__next"
            aria-label="Next image" data-lightbox-step="1">${icon("next")}</button>
    <p class="lightbox__count" aria-live="polite"></p>` : ""}`;
  document.body.append(dialog);
  return dialog;
}

export function initLightbox() {
  const links = [...document.querySelectorAll("a[data-lightbox]")];
  if (!links.length || typeof HTMLDialogElement !== "function") return;

  const dialog = buildDialog(links.length > 1);
  const img = dialog.querySelector(".lightbox__img");
  const count = dialog.querySelector(".lightbox__count");
  let current = 0;

  function show(index) {
    current = (index + links.length) % links.length;
    const link = links[current];
    const thumb = link.querySelector("img");
    // Swap dimensions before src so the box never shows the last image's
    // aspect ratio while the next one decodes.
    img.removeAttribute("src");
    img.width = thumb?.naturalWidth || Number(thumb?.getAttribute("width")) || 0;
    img.height = thumb?.naturalHeight || Number(thumb?.getAttribute("height")) || 0;
    img.alt = thumb?.alt ?? "";
    img.src = link.href;
    if (count) count.textContent = `${current + 1} / ${links.length}`;
  }

  links.forEach((link, index) => {
    link.addEventListener("click", (event) => {
      if (event.button !== 0 || event.metaKey || event.ctrlKey
          || event.shiftKey || event.altKey) return;
      event.preventDefault();
      show(index);
      dialog.showModal();
    });
  });

  dialog.addEventListener("click", (event) => {
    const step = event.target.closest("[data-lightbox-step]");
    if (step) return show(current + Number(step.dataset.lightboxStep));
    // The dialog and figure fill the viewport; only the image and the buttons
    // sit on top of them, so any other click landed on the dark surround.
    if (event.target.closest("[data-lightbox-close]")
        || event.target === dialog
        || event.target.classList.contains("lightbox__figure")) {
      dialog.close();
    }
  });

  dialog.addEventListener("keydown", (event) => {
    if (links.length < 2) return;
    if (event.key === "ArrowLeft") { event.preventDefault(); show(current - 1); }
    if (event.key === "ArrowRight") { event.preventDefault(); show(current + 1); }
  });

  // Hand focus back to the link for the image last shown, which may not be
  // the one that opened the dialog, so keyboard users land where they are.
  dialog.addEventListener("close", () => links[current].focus());
}
