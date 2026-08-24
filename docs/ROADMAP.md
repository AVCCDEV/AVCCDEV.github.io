# Roadmap

One module per session. Check the box when it is built, verified in the browser,
and committed. Add notes the next session would otherwise have to rediscover.

## Modules

- [x] **1 — Foundation & shell**
  Repo, gitignore, design tokens, base stylesheet, sticky header with mobile
  menu and theme toggle, footer, landing-page skeleton, this roadmap.
  *Notes: theme is stored under the `av-theme` localStorage key and applied by
  an inline script in `<head>` to avoid a flash. Nav marks the current page
  automatically from the URL, so every page can share identical header markup.*

- [ ] **2 — Work gallery**
  `/work/` index: responsive grid of pieces, lazy-loaded images, filter by
  category. Decide first whether piece data lives in a JSON file loaded by JS
  or is written straight into the HTML.

- [ ] **3 — Piece detail page**
  Template for a single artwork: large image (or set), title, year, medium,
  dimensions, description, prev/next links.

- [ ] **4 — About page**
  Bio, portrait, skills/tools, exhibitions or experience, resume download.

- [ ] **5 — Contact page**
  Static form (Formspree or a `mailto:` link — no backend available on Pages),
  social profiles, availability note.

- [ ] **6 — Polish**
  404 page, favicon and app icons, Open Graph share image, `sitemap.xml`,
  `robots.txt`, scroll-reveal animations, Lighthouse pass.

## Open questions

- [ ] **Domain** — exact custom domain, so `CNAME` and the canonical/OG URLs
      can be filled in. `index.html` currently has `SITE_URL` placeholders.
- [ ] **Repo** — GitHub remote URL, so `git remote add origin …` can be run.
- [ ] **Discipline** — what kind of art the portfolio shows. Drives the gallery
      aspect ratios and the metadata fields on a piece.
- [ ] **Images** — where the artwork files are, and roughly how many.
- [ ] **Social links** — Instagram / ArtStation / LinkedIn URLs for the footer.

## Decisions made

- Plain static HTML/CSS/JS, no build step and no framework — pushing to `main`
  is the entire deploy.
- Built fresh; the Pofo template in `Reference/` is visual reference only and
  stays out of the repo.
- Custom domain, so root-absolute paths are used throughout.
- Warm terracotta accent on a near-neutral ink palette, Fraunces for display
  and Inter for UI, light and dark themes both first-class.
