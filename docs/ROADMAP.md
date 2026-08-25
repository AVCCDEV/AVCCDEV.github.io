# Roadmap

One module per session: build, verify in the browser, commit. Tick the box and
note only what the next session would otherwise rediscover. Conventions and
gotchas live in `CLAUDE.md` — do not repeat them here.

**Priority:** piece pages first. Landing page and deploy are parked.

## Modules

- [x] **1 — Foundation** — tokens, base CSS, header (mobile menu, theme
      toggle), footer, landing skeleton.
- [x] **1b — Workspace split** — `site/` is the git root; `Reference/` and
      `MediaPool/` sit above it, unreachable by git.
- [x] **2 — Piece pages** — `obsidian-20th-anniversary-logo`,
      `alien-rogue-incursion-announce`, `alien-rogue-incursion-story-reveal`.
      Shared template `css/pages/piece.css`. Shape follows the briefs exactly:
      anything a brief did not ask for was removed, not stubbed.
- [ ] **3 — Work index** ← NEXT — `/work/`: grid linking each piece, lazy
      thumbnails, filter by project.
- [ ] **4 — About** — bio, portrait, skills, experience, resume.
- [ ] **5 — Contact** — static form (Formspree or `mailto:`; Pages has no
      backend), socials, availability.
- [ ] **6 — Landing finish** — hero copy, featured pieces, social links,
      the "logo garden" of flippable cards from Adam's sketch.
- [ ] **7 — Deploy & polish** — `CNAME`, real canonical/OG URLs, 404,
      favicons, share image, `sitemap.xml`, `robots.txt`, Lighthouse, enable
      Pages.

## Blocked on Adam

- **Domain** — for `CNAME` and the `SITE_URL` placeholders.
- **Repo URL** — to add the remote and push.
- **Social links** — Instagram / ArtStation / LinkedIn.
- **Year** — no piece page shows one; the briefs give no dates.
- **Git history is 33 MB** against a ~1 MB tree — the deleted 32 MB Obsidian
  trailers persist in it. Unpushed, so it can still be rewritten; destructive,
  so ask first.

## Decisions

- Video is encoded by `../tools/media/compress.sh` (portable ffmpeg in
  `../tools/`, outside the repo). Masters stay in MediaPool; the manifest
  records which preset each clip ships at.

- Static HTML/CSS/JS, no build, no framework. Pushing `main` is the deploy.
- Built fresh; Pofo is visual reference only and lives outside the repo.
- Custom domain, so root-absolute paths everywhere.
- Red accent, Fraunces display + Inter UI, both themes first-class.
  **Never orange** — too close to the Buddha Jones mark.
- Trailers are YouTube embeds, never committed files.
