# Tool logos

Monochrome marks used by the `.tool-chip` component (see
`css/components/tool-chip.css`). They are painted with `mask-image` plus
`background-color: currentColor`, so they inherit the surrounding text colour
and work in both themes — never add a `fill` to these files.

Both are wordmark-free, since the chip already prints the tool's name.

| File | Source | Licence |
| --- | --- | --- |
| `unreal-engine.svg` | Wikimedia Commons, *UE Logo Black Centered.svg* — badge and swoosh paths extracted, wordmark dropped | Public domain (simple-logo threshold) |
| `blender.svg` | Wikimedia Commons, *Blender logo no text.svg* — body path only; it carries its own ring cut-out, so the "eye" stays transparent | Public domain (simple-logo threshold) |

These are third-party trademarks, used nominatively to credit the tools used on
a piece. Do not restyle them into brand colours: Blender's orange is exactly
the colour this site avoids.
