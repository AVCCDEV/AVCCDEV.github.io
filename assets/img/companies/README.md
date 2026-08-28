# Company marks

Client and studio logos used by the `.company-mark` component (see
`css/components/company-mark.css`). They are painted with `mask-image` plus
`background-color: currentColor`, so they inherit the surrounding text colour
and work in both themes.

Unlike the tool marks these are **PNG, and they keep their wordmarks** — a wide
mark replaces the company's name on the page rather than sitting beside it, so
dropping the wordmark would leave nothing to read.

## Two shapes

A mark only stands in for the name if it actually says the name. Marks that are
**square-ish (ratio < 1.5) or carry no lettering at all** get `--labelled`
instead: the logo moves to a child span and the name prints beside it, the same
lockup as a tool chip. That is **Xbox Game Studios** (a sphere, no text),
**Undead Labs**, and **Legion Studios** (both stacked, with lettering too small
to read at this size). Everything else stands alone.

A labelled mark drops its optical scale back to 1 — the scale exists to rescue
lettering baked into a mark, and these print their name in real type instead.

Only the alpha channel is ever used. The RGB is pure white so the files are
still legible on their own in a dark viewer; nothing reads that colour.

## Where they came from

Masters are in `MediaPool/Logos/` (outside the repo), most of them supplied as
black-on-transparent. `MediaPool/Logos/white/` holds the whitened intermediates.
Marks that carry internal white detail — Undead Labs' skull, Stoic's wave, the
Xbox sphere — were **knocked out, not flattened**: black became opaque and white
became a hole, so the detail survives and the mark inverts correctly in light
theme instead of melting into a solid blob.

## Sizing

Two numbers per company in the CSS, both derived from the exported file:

- `--company-ratio` — the trimmed ink box's aspect. Files are trimmed to their
  own ink bounds first; baked-in margin makes a mask render visibly smaller
  than its neighbours.
- `--company-scale` — an optical correction, applied only to the standalone
  marks. Setting every mark to one box height does not work there: the set runs
  from a 5.3:1 wordmark (Survios) to a stacked crest (Undead Labs, 0.93:1), and
  at equal box height the crest reads as a third the weight. Scale is
  `(0.736 / (ratio x ink_density)) ^ 1/4`, clamped to 0.85–1.45, anchored on
  inXile at 1.0. The fourth root damps it: equalising ink area outright (the
  square root) overshoots to 2.3x on the sparse marks and makes them dominate
  the row.

The base height is **1.92em**, raised from 1.6em on 2026-08-27 at Adam's
request. Labelled marks use that base flat; standalone marks multiply it by
their scale.

Re-export with a different crop and both numbers change. Recompute them.

## Companies still printing as text

No mark supplied yet for **Buddha Jones** (the studio on 12 of 13 pieces),
**Square Enix**, or **20th Century Games**. They render as plain text, which
the component supports by design — omit `data-company` and nothing else
changes.

These are third-party trademarks, used nominatively to credit the client and
studio on a piece. Do not restyle them into brand colours.
