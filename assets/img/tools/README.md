# Tool logos

Monochrome marks used by the `.tool-chip` component (see
`css/components/tool-chip.css`). They are painted with `mask-image` plus
`background-color: currentColor`, so they inherit the surrounding text colour
and work in both themes — never add a `fill` to the SVG.

Only the alpha channel is ever read, so SVG and PNG are interchangeable here.
The PNGs keep pure-white RGB so they stay legible on their own in a dark
viewer; nothing reads that colour.

| File | Source | Licence |
| --- | --- | --- |
| `unreal-engine.svg` | Wikimedia Commons, *UE Logo Black Centered.svg* — badge and swoosh paths extracted, wordmark dropped | Public domain (simple-logo threshold) |
| `maya.png` | Adam's own art, `MediaPool/Logos/` | Autodesk trademark, nominative use |
| `houdini.png` | Adam's own art, `MediaPool/Logos/` | SideFX trademark, nominative use |
| `blender.png` | Adam's own art, `MediaPool/Logos/` | Blender Foundation trademark, nominative use |

## These are the real badges, not extracted glyphs

Maya, Houdini, and Blender were traced/extracted marks until 2026-08-27, when
Adam replaced them with his own conversions of the actual product badges. The
difference is deliberate and worth not "fixing" back:

- **Maya** is the full Autodesk sheet badge with the *M* and *AYA* letterforms
  knocked out of it, not an isolated glyph.
- **Houdini** is the plate with the spiral knocked out, not the isolated
  spiral. The previous file dropped the orange plate and kept the spiral;
  this one keeps the plate's silhouette and cuts the spiral out of it.
- **Blender** keeps its own ring cut-out, so the "eye" stays transparent.

They read as heavier than the old outline marks because they are solid
silhouettes. That is the intended look.

## Conversion

Sources in `MediaPool/Logos/` were coloured-on-white or white-on-black. The
rule Adam gave: colour becomes white, and whatever was white becomes a hole —
so internal detail survives and the mark still inverts correctly in light
theme. Alpha comes from `255 - min(R,G,B)` normalised by a local 5x5 maximum,
which resolves antialiased edges to true sub-pixel coverage instead of a
threshold's staircase.

Each file is then trimmed to its own ink bounds and capped at 96 px on the
long edge. **Trim matters**: the chip box is a 1.15rem square painted with
`contain`, so baked-in margin makes a mark render visibly smaller than its
neighbours.

## Still missing

**Unity**, **After Effects**, and **Photoshop** appear in Adam's briefs' Logo
Gardens but have no art in `MediaPool/Logos/`, so their chips print as text.
That is supported — omit the `<span class="tool-chip__logo">` entirely; a
`data-tool` with no matching selector paints a solid currentColor square.

These are third-party trademarks, used nominatively to credit the tools used on
a piece. Do not restyle them into brand colours: Blender's orange is exactly
the colour this site avoids.
