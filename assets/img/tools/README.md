# Tool logos

Monochrome marks used by the `.tool-chip` component (see
`css/components/tool-chip.css`). They are painted with `mask-image` plus
`background-color: currentColor`, so they inherit the surrounding text colour
and work in both themes — never add a `fill` to these files.

All are wordmark-free, since the chip already prints the tool's name.

| File | Source | Licence |
| --- | --- | --- |
| `unreal-engine.svg` | Wikimedia Commons, *UE Logo Black Centered.svg* — badge and swoosh paths extracted, wordmark dropped | Public domain (simple-logo threshold) |
| `blender.svg` | Wikimedia Commons, *Blender logo no text.svg* — body path only; it carries its own ring cut-out, so the "eye" stays transparent | Public domain (simple-logo threshold) |
| `houdini.svg` | Traced from Wikimedia Commons, *Houdini3D icon.png* (Side Effects Software, 520x520) — the white spiral only, with the orange plate dropped | Public domain (simple-logo threshold) |

These are third-party trademarks, used nominatively to credit the tools used on
a piece. Do not restyle them into brand colours: Blender's orange is exactly
the colour this site avoids.

## Tracing a raster mark

`houdini.svg` is the only one not lifted from an existing SVG — Commons has no
Houdini badge in vector form, only a 1606x284 **wordmark**, which is the wrong
shape for a chip and redundant next to the printed name. It was traced from the
520x520 PNG icon instead:

- Threshold the white region, confirm it is a single connected component with
  no enclosed holes, then crack-follow its boundary.
- Simplify (Douglas-Peucker, eps 1.5) and fit Catmull-Rom cubics, zeroing the
  tangent at turns sharper than 40 degrees so the spiral tip and the two
  square-edge cuts stay crisp.
- Check the result by rasterising it back and comparing with the source mask —
  this one is at IoU 0.977.
- Tighten the `viewBox` to the shape's own bounding box, squared. The mask uses
  `contain`, so leftover empty margin makes the mark render visibly smaller
  than its neighbours.

The flat edges on the left and bottom are in the original: the spiral's outer
arm is clipped by the orange plate.
