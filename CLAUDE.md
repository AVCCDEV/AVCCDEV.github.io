# AdamV_Art — project brief

Static portfolio site for Adam Velazquez, deployed on GitHub Pages at a custom
domain. **Read this file first in every new session** — it is the whole context
you need. Then read `docs/ROADMAP.md` to see which module is next.

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
- `Reference/` is a licensed third-party template (Pofo) kept for visual
  reference only. It is gitignored. Never copy its markup, CSS, or JS into the
  site; never link to it.

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

## Layout

```
index.html            landing page
CNAME                 custom domain for GitHub Pages
.nojekyll             stops Pages running Jekyll over the repo
css/
  tokens.css          design system variables — start here
  base.css            reset, typography, layout primitives, buttons
  components/         reusable blocks (site-header, site-footer, …)
  pages/              page-specific styles (home.css, …)
js/
  main.js             entry point; imports and runs the modules
  modules/            one feature per file (theme.js, nav.js, …)
assets/img/           site images
docs/ROADMAP.md       module checklist and running notes
Reference/            local-only template reference (gitignored)
```

## Verifying a module

There is no test suite. Before committing:

```sh
python -m http.server 8000    # then open http://localhost:8000
```

Check at 375px and 1440px wide, in both themes, and tab through the page with
the keyboard. A file:// open will not work — ES modules need a real server.

## Deploying

`git push origin main`. GitHub Pages serves `main` at the repo root; the live
site updates in under a minute. There is no build and no Actions workflow.
