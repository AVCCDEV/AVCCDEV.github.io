# Roadmap

One module per session. Check the box when it is built, verified in the browser,
and committed. Add notes the next session would otherwise have to rediscover.

**Current priority (set by Adam):** build the portfolio piece pages first.
The landing page and deployment are deliberately parked until those exist.

## Modules

- [x] **1 — Foundation & shell**
  Repo, design tokens, base stylesheet, sticky header with mobile menu and
  theme toggle, footer, landing-page skeleton, conventions in `CLAUDE.md`.
  *Notes: theme is stored under the `av-theme` localStorage key and applied by
  an inline script in `<head>` to avoid a flash. Nav marks the current page
  automatically from the URL, so every page shares identical header markup.*

- [x] **1b — Workspace separation**
  Site moved into its own `site/` folder, which is now the git root.
  `Reference/` and `MediaPool/` sit above it, unreachable by git. Image
  budget and export pipeline documented in `CLAUDE.md`.

- [~] **2 — Piece detail page — template built, awaiting content**
  `/work/obsidian-20th-anniversary-logo/` is the first piece and doubles as the
  reusable template (`css/pages/piece.css` names no project).
  Layout from the Traverse Town reference: stacked display title, label/value
  meta strip, then Overview, Summary, Breakdown, Gallery, related links.
  Styling experiments with Pofo: Montserrat display at `clamp(2.6rem, 8.4vw,
  7.5rem)` uppercase, small muted body copy, letter-spaced micro-labels,
  fade-in on scroll via `js/modules/reveal.js`.
  *Every unresolved spot is a loud dashed `.placeholder` block — grep for
  `placeholder` and `TODO(` before this page ever deploys.*

  Blocked on Adam:
  - Responsibilities list for the Summary section (brief has none).
  - Year, and whether the tools line continues past "Unreal Engine, Blender,".
  - Whether "Logo Garden" is this piece's category or a separate credit; it is
    currently rendered as the "Discipline" meta value.
  - Breakdown copy and gallery stills.
  - Video needs compressing (17 MB webm / 15 MB mp4 committed as-is) and a
    poster frame. ffmpeg is not installed on this machine.

- [ ] **3 — Work index / gallery**
  `/work/` — responsive grid linking to each piece page, lazy-loaded
  thumbnails, filter by project or category.

- [ ] **4 — About page**
  Bio, portrait, skills and tools, experience, resume download.

- [ ] **5 — Contact page**
  Static form (Formspree or `mailto:` — Pages has no backend), social
  profiles, availability note.

- [ ] **6 — Landing page finish**
  Real hero copy, featured pieces pulled from the work set, social links.

- [ ] **7 — Deployment & polish**
  `CNAME`, real canonical/OG URLs, 404 page, favicon and app icons, share
  image, `sitemap.xml`, `robots.txt`, Lighthouse pass, push and enable Pages.

## Open questions

- [ ] **Discipline & metadata** — what the work is (game art? 3D? concept?)
      and therefore what fields a piece page shows and what aspect ratios the
      grid should use.
- [ ] **Artwork** — files to land in `MediaPool/<Project>/`; how many pieces,
      and whether any are video or turntables rather than stills.
- [ ] **Domain** — for `CNAME` and the `SITE_URL` placeholders in `index.html`.
- [ ] **Repo URL** — to add the git remote and push.
- [ ] **Social links** — Instagram / ArtStation / LinkedIn for the footer.

## Decisions made

- Plain static HTML/CSS/JS, no build step and no framework — pushing to `main`
  is the entire deploy.
- Built fresh; the Pofo template in `../Reference/` is visual reference only
  and lives outside the repo.
- Custom domain, so root-absolute paths are used throughout.
- Red accent on a near-neutral ink palette, Fraunces for display and Inter
  for UI, light and dark themes both first-class. Orange was rejected: too
  close to the Buddha Jones mark. Avoid orange anywhere on the site.
- Repo root is `site/`. Raw artwork stages in `../MediaPool/`; only web-ready
  exports are committed, to keep the published site far under the 1 GB cap.
