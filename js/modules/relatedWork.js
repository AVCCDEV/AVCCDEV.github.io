/**
 * relatedWork.js — builds the related grid at the foot of a piece page.
 *
 * Drop this anywhere a piece page should offer more work:
 *
 *   <section class="section related-work" data-related-work>
 *     <!-- static fallback for the no-JS path lives here -->
 *   </section>
 *
 * Nothing else. The module reads js/data/pieces.js, picks pieces at random and
 * replaces the placeholder's contents. It replaced two hand-written links per
 * page plus a slug → thumbnail map in piece.css, so adding a piece is now one
 * catalogue entry rather than an edit to every page that might want to link to
 * it.
 *
 * THE PICK IS RANDOM — Adam's call on 2026-08-28, replacing a ranking that
 * went same group, then same client, then catalogue neighbours. That ranking
 * was deterministic, so a piece page showed the same three cards to every
 * visitor on every load, and the Alien Rogue and Clockwork pages could only
 * ever offer each other. A fresh draw per page load surfaces the whole
 * catalogue instead. Pins still come first and still come out in the order
 * they were written, so a page that must offer a specific piece can say so.
 *
 * OPTIONAL ATTRIBUTES on the placeholder:
 *   data-related-work="slug-a slug-b"  Pin these pieces, in this order, ahead
 *                                      of the random draw. Slugs may be bare
 *                                      or full "/work/…/" paths.
 *   data-related-count="4"             How many cards. Default 3.
 *   data-related-title="More like this"  Heading text. Default "Related work".
 *
 * No-op when the placeholder is absent, so main.js can call it on every page.
 */

import { PIECES } from "../data/pieces.js";

/* Three. The grid never grows past three columns — past a phone the extra
   width goes into the gap between the cards, not into more of them or bigger
   ones. See components/related-work.css. */
const DEFAULT_COUNT = 3;
const DEFAULT_TITLE = "Related work";

export function initRelatedWork() {
  const host = document.querySelector("[data-related-work]");
  if (!host) return;

  const current = currentSlug();
  const count = Number(host.dataset.relatedCount) || DEFAULT_COUNT;
  const pinned = (host.dataset.relatedWork || "").split(/\s+/).filter(Boolean);

  const picks = choose(current, pinned, count);
  if (!picks.length) return; // Leave the static fallback in place.

  host.replaceChildren(render(picks, host.dataset.relatedTitle || DEFAULT_TITLE));
}

/**
 * The page's own slug, normalised to the "/work/<name>/" the catalogue uses so
 * a piece never offers itself. Handles both "/work/x/" and "/work/x/index.html".
 */
function currentSlug() {
  const path = window.location.pathname.replace(/index\.html$/, "");
  return path.endsWith("/") ? path : `${path}/`;
}

/** "towerborne-opening-cinematic" and "/work/towerborne-opening-cinematic/"
 *  both name the same piece — accept either in data-related-work. */
function matchesSlug(piece, name) {
  return piece.slug === name || piece.slug === `/work/${name}/`;
}

/**
 * Picks up to `count` pieces to offer:
 *   1. pins, in the order they were written
 *   2. a random draw from everything else in the catalogue
 *
 * The current piece is filtered out first, so a page never offers itself, and
 * the draw is without replacement, so it never shows the same card twice.
 * Fewer pieces in the catalogue than `count` simply yields a shorter grid.
 */
function choose(currentPath, pinned, count) {
  const others = PIECES.filter((piece) => piece.slug !== currentPath);
  const picks = [];

  const add = (piece) => {
    if (piece && picks.length < count && !picks.includes(piece)) picks.push(piece);
  };

  pinned.forEach((name) => add(others.find((piece) => matchesSlug(piece, name))));

  shuffle(others.filter((piece) => !picks.includes(piece))).forEach(add);

  return picks;
}

/**
 * Fisher-Yates, on a copy. Math.random() is right here: this decides which
 * three thumbnails a visitor sees, not anything that needs to be unguessable.
 */
function shuffle(list) {
  const out = list.slice();
  for (let i = out.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

function render(picks, title) {
  const frag = document.createDocumentFragment();

  const heading = el("h2", "related-work__title");
  heading.textContent = title;
  frag.append(heading);

  const list = el("ul", "related-work__list");
  list.setAttribute("role", "list");
  picks.forEach((piece) => list.append(card(piece)));
  frag.append(list);

  return frag;
}

/**
 * One card. The whole thing is a single <a>: at five-across the cards are
 * ~250px wide, and a separate "See more" row underneath was as tall as the
 * title it sat below — pure chrome on a block that is meant to stay quiet.
 * Wrapping the link round the artwork and the title gets the same click target
 * and the same one-tab-stop-per-card with nothing extra drawn, and the <h3>
 * inside it still names the card for the document outline and for a screen
 * reader listing links.
 */
function card(piece) {
  const item = el("li", "related-work__item");

  const link = el("a", "related-work__link");
  link.href = piece.slug;

  const media = el("div", "related-work__media");
  const img = el("img", "related-work__image");
  img.src = piece.thumb;
  img.alt = ""; // The title below names the destination; the artwork repeats it.
  img.width = 800;
  img.height = 450;
  img.loading = "lazy";
  img.decoding = "async";
  media.append(img);

  const meta = el("p", "related-work__client");
  meta.append(document.createTextNode(`${piece.client} · `));
  const year = el("span", "related-work__year");
  year.textContent = piece.year;
  meta.append(year);

  const name = el("h3", "related-work__name");
  piece.title.forEach((line, i) => {
    const span = el("span", i === 0
      ? "related-work__name-line"
      : "related-work__name-line related-work__name-line--soft");
    span.textContent = line;
    name.append(span);
  });

  link.append(media, meta, name);
  item.append(link);
  return item;
}

function el(tag, className) {
  const node = document.createElement(tag);
  node.className = className;
  return node;
}
