/**
 * filter.js — filters the /work/ grid by discipline.
 *
 * Markup contract:
 *   [data-filter-group]           wraps the buttons
 *   [data-filter="all|<value>"]   one <button> per choice, aria-pressed set
 *   [data-filter-grid]            the grid
 *   [data-discipline="<value>"]   on each card
 *   [data-filter-count]           optional live region for the tally
 *   [data-filter-empty]           optional "nothing matched" message
 *
 * Progressive enhancement: the controls are hidden by CSS until this module
 * adds .has-filter to <html>, so with JS off every card just renders.
 *
 * The active filter is mirrored into the URL hash (#titles) so a filtered
 * view can be linked and survives a reload.
 */

const ALL = "all";

export function initFilter() {
  const group = document.querySelector("[data-filter-group]");
  const grid = document.querySelector("[data-filter-grid]");
  if (!group || !grid) return;

  const buttons = Array.from(group.querySelectorAll("[data-filter]"));
  const cards = Array.from(grid.querySelectorAll("[data-discipline]"));
  if (!buttons.length || !cards.length) return;

  const countEl = document.querySelector("[data-filter-count]");
  const emptyEl = document.querySelector("[data-filter-empty]");
  const known = new Set(buttons.map((b) => b.dataset.filter));

  function apply(value) {
    let shown = 0;

    cards.forEach((card) => {
      const match = value === ALL || card.dataset.discipline === value;
      card.hidden = !match;
      if (match) shown += 1;
    });

    buttons.forEach((button) => {
      button.setAttribute("aria-pressed", String(button.dataset.filter === value));
    });

    if (countEl) {
      countEl.textContent =
        shown === cards.length
          ? `${cards.length} pieces`
          : `${shown} of ${cards.length} pieces`;
    }
    if (emptyEl) emptyEl.hidden = shown !== 0;

    // replaceState, not a hash assignment — this must not add history entries
    // or jump the page to an element that happens to share the id.
    const url = value === ALL ? window.location.pathname : `#${value}`;
    window.history.replaceState(null, "", url);
  }

  group.addEventListener("click", (event) => {
    const button = event.target.closest("[data-filter]");
    if (!button || !group.contains(button)) return;
    apply(button.dataset.filter);
  });

  // Reveal the controls only now that they do something.
  document.documentElement.classList.add("has-filter");

  const fromHash = window.location.hash.slice(1);
  apply(known.has(fromHash) ? fromHash : ALL);
}
