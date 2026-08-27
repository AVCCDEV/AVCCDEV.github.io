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
- **Git history is 33 MB** against a ~1 MB tree — the deleted 32 MB Obsidian
  trailers persist in it. Unpushed, so it can still be rewritten; destructive,
  so ask first.

## Decisions

- **Work is ordered chronologically, oldest first**, on `/` and on `/work/`.
  Adam supplied the years on 2026-08-26; they are not in the briefs, so this
  table is the only record. The landing rows show the year next to the client;
  the `/work/` cards stay text-free, so there the order alone carries it.

  | Piece | Year | Built |
  | --- | --- | --- |
  | Towerborne Official Reveal Trailer | 2023 | scaffold |
  | Obsidian 20th Anniversary Logo | 2023 | yes |
  | Towerborne Opening Cinematic | 2024 | scaffold |
  | Alien Rogue Incursion Story Reveal | 2024 | yes |
  | Covenant | 2024 | yes |
  | Avowed Times Square | 2025 | yes |
  | Clockwork Revolution — Games Showcase 2025 | 2025 | — |
  | Alien Rogue Incursion Flatscreen | 2025 | — |
  | Alien Rogue Incursion Evolved Edition | 2025 | yes |
  | Docked | 2025 | — |
  | Clockwork Revolution — Games Showcase 2026 | 2026 | yes |
  | State of Decay 3 | 2026 | yes |

  Ties within a year keep the order above. Any new piece slots in by year in
  both `index.html` and `work/index.html`; on `/work/` the reveal stagger
  (`data-reveal-delay` 0/80/160) repeats every three cards regardless, and on
  `/` the `feature--flip` modifier alternates row by row. Inserting a piece
  mid-list therefore reflows both of those on every row after it.

- **Disciplines on the `/work/` filter are `cinematic`, `titles`, and
  `gameplay`.** Covenant added the third on 2026-08-27 — it is animation work,
  not a cinematic. The filter buttons are hand-written, so a new discipline
  means a new button plus the `data-discipline` on the card.

- **Towerborne opening cinematic: built 2026-08-27, embed still blocked.**
  Adam saved the real copy over `Towerborne Opening Cinematic 2024.md` the same
  day. `/work/towerborne-opening-cinematic/` is built from it: Stoic Studio /
  Buddha Jones, Blender only, his summary verbatim (except "Xbox games studios"
  set as the proper noun "Xbox Game Studios" — flagged inline).

  **Its `[featured:]` id is wrong and must not be shipped.** The brief gives
  `_eSfwxNYKA4`, which is byte for byte the id already embedded on the reveal
  trailer page. A YouTube id maps to exactly one video, so the two pages cannot
  both be right — the line survived a copy-paste. The real id is not
  recoverable: the MediaPool download is named `..._Media_7Wlmk4pOtE_001_1080p.mp4`
  and `7Wlmk4pOtE` is 10 characters against YouTube's 11, truncated by the
  downloader. The embed is a `.placeholder` until Adam supplies the watch URL.
  **This is the third time a copied brief would have put the wrong content on a
  page — always diff a new brief against its siblings before building.**

  The card was restored to `/work/` in its original slot (nine cards, stagger
  re-cycled to 0 / 80 / 160, tally back to "9 pieces"), and the reveal page's
  related nav now points here first — the summary opens "After the reveal
  trailer…", so the pair reads in that order.

  **The storyboard comparison ships webm-only.** Master is 477.8 MB of
  1080p60 at 38.8 Mbps, 103 s. At `tiny` it encoded to 27.2 MB webm + 37.3 MB
  mp4 + 151 KB poster = 64.6 MB, a third of the working tree. **Adam chose to
  drop the mp4 fallback (2026-08-27)**; the webm and poster ship. Same trade as
  the Alien Rogue comparison, which is also webm-only, and the page carries the
  same `TODO(media)`. Working tree went 186 MB -> 149 MB.

  **The manifest entry is commented out, deliberately.** `compress.sh` keys
  staleness on the mp4 existing (line 91), so with that line live a bare
  `./compress.sh` would see the missing mp4 and silently re-encode all 103 s,
  restoring the 37 MB file. Uncomment only if the mp4 is wanted back.

  Note the preset was never the problem: the Alien Rogue precedent is 6.2 MB
  for 31 s at the same `tiny`, and this clip is 3.3x longer. Length is what
  drives the size. **The repo was already ~123 MB before this piece**, against
  CLAUDE.md's "well under 100 MB" target — worth a pass of its own, since the
  three biggest folders (docked 32 MB, clockwork-revolution 29 MB,
  towerborne 28 MB) are most of it.

- **Towerborne reveal trailer: done, built from the real brief (2026-08-27).**
  The two briefs in `Reference/DetailPages/TowerBorne/` had been seeded from
  the State of Decay 3 brief and never overwritten — all three files shared
  md5 `e6d8ec0a…`. Adam saved the real copy over
  `TowerborneOfficialRevealTrailer 2023.md` on 2026-08-27, and
  `/work/towerborne-official-reveal-trailer/` was rebuilt from it. It now has
  no `.placeholder` blocks and no `TODO(content)` beyond the site-wide ones.

  Two corrections to his copy, both flagged inline on the page: the brief's
  title reads "Official Reveal **Tailer**" (rendered as "Trailer"), and the
  caption's "Wip" is rendered "WIP". Revert if either was deliberate.

  **The client was `Stoic Studio`, not Xbox Game Studios** — worth recording,
  because Xbox Game Studios is the publisher and was the plausible wrong guess.
  Second time this field would have gone wrong if guessed; Covenant was the
  first. Studio `Buddha Jones` was inferred from the resume before the copy
  arrived and turned out correct, but do not treat that as licence to guess.

  **Houdini now has a mark (2026-08-27).** `assets/img/tools/houdini.svg`,
  traced from the Commons PNG icon because Commons has no Houdini badge in
  vector form — only a 1606x284 wordmark, wrong shape for a chip and redundant
  next to the printed name. Method and the IoU check are written up in
  `assets/img/tools/README.md`. The `[data-tool="houdini"]` rule is at the
  bottom of `tool-chip.css` and the reveal page's chip now carries its logo.
  Nothing in the file hardcodes a colour, so the "never orange" rule holds by
  construction — the mask paints `currentColor`.

  **First real use of `.piece-gallery`** — it was defined in `piece.css` but
  unused until now. Carries the three storyboard frames from
  `MediaPool/TowerBorne/Announce/` (1, 2, 3 in the brief's order), exported at
  1600px longest edge, WebP q80, 88/126/110 KB. Sources are exactly 16:9, so
  the component's `aspect-ratio: 16 / 9` crops nothing — check that again for
  any piece whose stills are not 16:9.

  **The Opening Cinematic card was removed from `/work/` on 2026-08-27**, at
  Adam's direction, after he deleted that page. The grid reveals in rows of
  three, so the remaining eight cards were re-staggered back to a clean
  0 / 80 / 160 cycle — dropping a card shifts every later one into the wrong
  slot. `[data-filter-count]` was also hardcoded "9 pieces" and is now "8";
  `filter.js` only rewrites it inside `apply()`, so the markup has to be right
  on its own for the JS-disabled path. Every link on `/work/` and the landing
  page now resolves.

  Still on disk but unreferenced: `assets/img/towerborne/opening-cinematic.webp`
  (28 KB, never committed). Left in place deliberately — it is one export away
  from being needed again if that page comes back. Its brief is still a State
  of Decay 3 copy and needs the same save-over treatment first.

  Still unused in `MediaPool/TowerBorne/Announce/`: the 1280x720, 1:40 announce
  trailer master. The brief points at the YouTube cut (`_eSfwxNYKA4`), so the
  local master is not needed unless Adam wants a self-hosted clip.


- Video is encoded by `../tools/media/compress.sh` (portable ffmpeg in
  `../tools/`, outside the repo). Masters stay in MediaPool; the manifest
  records which preset each clip ships at.

- Static HTML/CSS/JS, no build, no framework. Pushing `main` is the deploy.
- Built fresh; Pofo is visual reference only and lives outside the repo.
- Custom domain, so root-absolute paths everywhere.
- Red accent, Fraunces display + Inter UI, both themes first-class.
  **Never orange** — too close to the Buddha Jones mark.
- Trailers are YouTube embeds, never committed files.
