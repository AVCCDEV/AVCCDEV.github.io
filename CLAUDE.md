# AdamV_Art — project brief

Static portfolio site for Adam Velazquez, deployed on GitHub Pages at a custom
domain. **Read this file first in every new session** — it is the whole context
you need. Then read `docs/ROADMAP.md` to see which module is next.

**This folder is the git repository and the entire deployed site.** Everything
here ships; nothing outside it does.

The workspace one level up holds local-only material. `../Reference/` contains
three different kinds of thing, and the rules differ:

- **`../Reference/DetailPages/<Piece>/*.md` — Adam's own briefs.** His copy and
  a rough design outline for each portfolio piece. **This is the spec.** Read
  the brief before building a piece page, use his words verbatim rather than
  rewriting them, and ask him rather than inventing content he did not supply.
- **`../Reference/site layouts/`** — saved peer portfolio sites plus Adam's
  current one. Inspiration for layout and structure; we still write our own
  markup.
- **`../Reference/html/`, `documentation/`, `*.zip`** — the licensed Pofo
  template. **Never copy** its markup, CSS, JS, or assets into this repo.

## How we work

One module per session. Build it, verify it in the browser, commit it, then the
context gets cleared and the next session starts fresh from this file. So:

- **Leave no half-finished module.** A session ends with working, committed code.
- **Record decisions here**, not in chat. If we choose something a future
  session would otherwise re-litigate, add it to Conventions below.
- **Update `docs/ROADMAP.md`** at the end of each module — check the box, note
  anything the next module needs to know.

## Hard constraints

- **No build step.** Hand-written HTML, CSS, and ES modules only. GitHub Pages
  serves the repo as-is; `git push` is the deploy.
- **No frameworks, no jQuery, no Bootstrap, no CSS-in-JS.** No npm dependencies.
- **No new runtime dependencies** without asking. Google Fonts is the only
  external request the site makes.
- **Keep the footprint small.** GitHub caps a published Pages site at 1 GB and
  warns past 1 GB of repo. Artwork is the only thing that could approach that,
  so every image is exported web-ready before it is committed: WebP (or JPEG),
  longest edge 2000px for full views and 800px for grid thumbnails, quality
  ~80. Target well under 100 MB total. Never commit PSD/AI/TIFF masters or
  camera-original files — `.gitignore` blocks the usual extensions. Committed
  images are permanent in git history, so check size *before* `git add`.

## Image pipeline

Full-resolution masters live in `../MediaPool/<Project>/`, outside the repo.
Only web-ready exports are committed, into `assets/img/<project>/`:

| Use            | Longest edge | Format        | Rough budget |
| -------------- | ------------ | ------------- | ------------ |
| Grid thumbnail | 800 px       | WebP, q~80    | < 120 KB     |
| Detail view    | 2000 px      | WebP, q~80    | < 400 KB     |

Every `<img>` gets `alt`, explicit `width`/`height` (to prevent layout shift),
and `loading="lazy"` unless it is above the fold.

## Conventions

**Paths.** The site is served from a domain root, so root-absolute paths
(`/css/base.css`, `/work/`) are correct everywhere. Do not use `../`.

**CSS.**
- `css/tokens.css` is the only place raw colors, sizes, and timings are defined.
  Every other stylesheet uses `var(--token)`. If you need a value that has no
  token, add the token.
- Layer order: `tokens.css` → `base.css` → `components/*.css` → `pages/*.css`.
  Each is a separate `<link>`; no `@import` (it serialises downloads).
- Class naming is BEM-ish: `.block`, `.block__element`, `.block--modifier`.
- A style used by two pages lives in `components/`. One page only: `pages/`.
- Every theme-dependent color must be defined in the base `:root` block, then
  overridden in **both** the `prefers-color-scheme: dark` block and the
  `[data-theme="dark"]` block. Never define a color only inside a media query.

**JavaScript.**
- One feature per file in `js/modules/`, each exporting a single `initX()`.
- `js/main.js` imports and calls them; it holds no feature logic.
- Every `init` must be a safe no-op when its markup is missing — the same
  `main.js` loads on every page.
- Progressive enhancement: content is readable and navigable with JS disabled.
- Wrap every `localStorage` read and write in `try`/`catch`.

**Markup and accessibility.**
- Semantic elements; one `<h1>` per page; headings never skip a level.
- The skip link stays the first element in `<body>`.
- Interactive controls are real `<button>`/`<a>` with accurate ARIA state.
- Never remove a focus outline without replacing it.
- Every `<img>` needs `alt`, plus `width`/`height` to prevent layout shift.
- Honour `prefers-reduced-motion` in any new animation.

**Content placeholders** are marked `TODO(content)`; setup values Adam still
owes us are marked `TODO(setup)`. Grep for `TODO(` before calling a page done.
Unresolved content also renders as a loud dashed `.placeholder` block — grep
for `placeholder` too, and never let one reach production.

**Piece pages are hand-maintained.** They were first generated from a one-off
script, but that script is gone and Adam edits these files directly. Edit the
HTML by hand; never regenerate, or you will silently revert his changes.

**Titles longer than ~35 characters need `.piece-title--long`.** At full
display size they wrap to four lines and push the trailer below the fold.

## Layout

The workspace holds three sibling folders. Only `site/` is the repository.

```
AdamV_Art/                  workspace — not a repo
├── Reference/              briefs, peer-site saves, Pofo template — see above
├── MediaPool/              raw artwork masters, never committed
└── site/                   ← THE REPO. Its root is what Pages serves.
    ├── index.html          landing page
    ├── CNAME               custom domain (TODO: add once the domain is known)
    ├── .nojekyll           stops Pages running Jekyll over the repo
    ├── css/
    │   ├── tokens.css      design system variables — start here
    │   ├── base.css        reset, typography, layout primitives, buttons
    │   ├── components/     reusable blocks (site-header, site-footer, …)
    │   └── pages/          page-specific styles (home.css, …)
    ├── js/
    │   ├── main.js         entry point; imports and runs the modules
    │   └── modules/        one feature per file (theme.js, nav.js, …)
    ├── assets/img/         web-ready site images
    │   └── tools/          monochrome tool logos (see its README)
    ├── assets/video/       only small clips; trailers are YouTube embeds
    ├── work/<slug>/        one folder per piece, each an index.html
    └── docs/ROADMAP.md     module checklist and running notes
```

All commands run from `site/`. If a session starts in the workspace folder,
`cd site` first.

## Verifying a module

There is no test suite. Serve the site, then look at it:

```sh
python -m http.server 8000    # then open http://localhost:8000
```

**Headless Chrome is installed and is the fastest way to actually see a page.**
Screenshot it, then read the PNG — this catches layout problems that reading
markup never will:

```sh
CH="/c/Program Files/Google/Chrome/Application/chrome.exe"
"$CH" --headless --disable-gpu \
      --user-data-dir=<fresh-temp-dir> \
      --blink-settings=preferredColorScheme=1 \
      --virtual-time-budget=5000 --hide-scrollbars \
      --window-size=1440,900 \
      --screenshot=<abs-path>.png <url>
```

- `preferredColorScheme=1` is light, `2` is dark. Without it, Chrome follows
  the machine's setting (currently dark), which is not what you usually want.
- `--virtual-time-budget` lets the scroll-reveal animations finish; without it
  everything is caught mid-fade at partial opacity.
- Pass a **fresh `--user-data-dir`** when re-checking an asset you just edited,
  or Chrome serves the cached copy and you debug a stale file.
- Paths must be **Windows-style** (`C:/...`), not Git Bash style (`/c/...`),
  for both `--screenshot` and any `file:///` URL.

Then check 375px and 1440px, both themes, and tab through with the keyboard.

**Gotcha:** `mask-image` with an external SVG silently fails over `file://`
(opaque origin) — tool-chip logos render blank. Always test them over HTTP.

A `file://` open will not work for the site at all — ES modules need a server.

## Deploying

`git push origin main`. GitHub Pages serves `main` at the repo root; the live
site updates in under a minute. There is no build and no Actions workflow.
