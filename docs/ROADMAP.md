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

- [x] **2 — Piece detail pages**
  Three pages, each built from its brief in `../Reference/DetailPages/`:
  - `/work/obsidian-20th-anniversary-logo/`
  - `/work/alien-rogue-incursion-announce/`
  - `/work/alien-rogue-incursion-story-reveal/`

  `css/pages/piece.css` is the shared template and names no project. Page
  shape follows the briefs exactly: kicker, stacked title, Client/Studio/Tools
  meta, trailer embed, summary copy, related work. The Summary/Breakdown/
  Gallery sections from the first draft were removed — no brief asked for them.

  *Notes:*
  - Trailers are **YouTube embeds** (`youtube-nocookie`, `loading="lazy"`), not
    committed files. This replaced 32 MB of local video with nothing.
  - Titles over ~35 characters get `.piece-title--long`; at full display size
    they wrapped to four lines and pushed the trailer below the fold.
  - Tool logos are monochrome masks in `assets/img/tools/` — Unreal Engine,
    Blender, Maya. See that folder's README for provenance and how to add one.
  - The only committed video is the Story Reveal storyboard comparison
    (932 KB webm). It is webm-only; an mp4 fallback still wants encoding.
  - Copy is verbatim from the briefs, with one exception: the Story Reveal
    brief reads "orignially", corrected to "originally". The same sentence
    also reads "with using in-game content" — left as written, still worth
    a look.

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
- [ ] **Git history is 33 MB** while the working tree is ~1 MB. The deleted
      Obsidian trailer files (32 MB) still live in history. Nothing has been
      pushed yet, so history can still be rewritten to drop them — Adam's call,
      since that is destructive. Harmless otherwise, just permanent.
- [ ] **Year** — no piece page shows one; the briefs do not give dates.
- [ ] **Obsidian tools line** ends "Unreal Engine, Blender," on a trailing
      comma. More tools, or just a stray comma?
- [ ] **Story Reveal copy** reads "for this trailer with using in-game
      content" — left verbatim, but "with" or "using" is probably one word too
      many.

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
