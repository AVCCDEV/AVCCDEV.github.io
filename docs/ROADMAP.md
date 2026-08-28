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
- [ ] **4 — About** — was built as a landing-page section and **pulled again
      on 2026-08-27** at Adam's direction. It is not lost: see the Decisions
      note below for what it held and how to put it back.
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
- **Social links** — Instagram and ArtStation. **LinkedIn is done**
  (supplied 2026-08-27, live in the connect band and every page footer);
  the other two are still `href="#"`-shaped holes. The markup comment
  beside the LinkedIn button in each file says where they go.
- **Git history is 33 MB** against a ~1 MB tree — the deleted 32 MB Obsidian
  trailers persist in it. Unpushed, so it can still be rewritten; destructive,
  so ask first.

## Decisions

- **The landing hero backdrop is Adam's reel, played near-sharp.**
  `MediaPool/SiteReels/Reel_LandingPageBackground.mp4` (229 MB, 159 s,
  1080p60 — he re-exported it on 2026-08-27) ships as
  `assets/video/home/landing-backdrop.{webm,jpg}` via the `backdrop` preset in
  `tools/media/compress.sh`: 1280 wide, 30 fps, silent, VP9 CRF 40.
  **28.1 MB, the heaviest single file in the repo.** He chose that knowingly
  over the two cheaper options (blur it, or trim the reel) when asked.

  **The blur is CSS, not baked into the file, and the weight follows from
  that.** The first cut pre-blurred with `gblur=sigma=7` at 854 wide and came
  in at 2.6 MB — a codec spends most of its bits on the high-frequency detail
  a Gaussian removes. Adam traded that away deliberately: he wants to set the
  blur per page from the markup, and a baked blur makes every adjustment a
  re-encode. **Do not "optimise" the blur back into the encode without asking
  him** — that is the thing he spent the bytes on.

  **The preset is sized by the blur, so the two move together.** `--hero-blur`
  is currently `2`, i.e. essentially sharp, which is why 1280/CRF 40 is
  needed; the encode has to serve the lowest blur the markup might ask for.
  If the blur ever goes back above ~12, drop the preset to 854/CRF 44 and the
  file gets several times smaller for no visible change.

  **The knob is `--hero-blur`**, set inline on `.hero__backdrop` in
  `index.html` (default in `tokens.css`). Unitless on purpose: `home.css`
  feeds the one number into both the blur radius and the scale that hides the
  transparent edge a CSS blur leaves behind, and CSS cannot divide one length
  by another to derive the second from the first.

  **webm only — the 34.6 MB mp4 was deleted on 2026-08-27**, at Adam's
  direction, same call he made for the Towerborne and Alien Rogue clips. Every
  browser that can run this site's ES modules decodes VP9, and anything that
  cannot keeps the poster still, which is the designed fallback anyway. The
  manifest line is commented out to match, because staleness is keyed on the
  mp4 existing (`compress.sh` line 91) and a bare `./compress.sh` would
  otherwise re-encode all 159 s again.

  The poster still is a real `<img>` layer under the video, not the `<video
  poster>` attribute, so it can carry `fetchpriority="high"` and paint before
  anything is decided about the reel. `js/modules/heroVideo.js` owns that
  decision: the markup has no `autoplay` and `preload="none"`, so a visitor on
  reduced motion, Save-Data, or 2G never downloads the 28 MB at all, and a
  refused autoplay just leaves the still. It is deliberately not
  `loopVideo.js` — that module hands the visitor controls when autoplay fails,
  which is right for a clip they came to watch and wrong for decoration behind
  the `<h1>`.

- **"Contact" is an anchor to the landing page, not a page of its own.**
  `/contact/` did not exist and every link to it 404'd — nav on all 11 pages,
  plus the hero CTA and the connect band's own button. Fixed 2026-08-27: they
  all point at **`/#connect`**, the "Let's talk." band at the bottom of the
  landing page. Root-absolute, so the nav block stays byte-identical on every
  page; on the landing page itself the browser treats it as a same-document
  fragment navigation and scrolls rather than reloading.

  **There is exactly one `id="connect"` in the site**, on `index.html`. An
  earlier pass gave each piece page's `.site-footer__top` the same id so
  Contact scrolled to the local footer, but Adam wanted the landing band
  specifically — those ids were removed again. Do not re-add them: two targets
  for one href is how it drifts back.

  No JS was needed. `base.css` already sets `scroll-behavior: smooth` (guarded
  by `prefers-reduced-motion`) and `scroll-padding-top` for the sticky header,
  `nav.js` already closes the mobile panel on any link click, and
  `initCurrentLink()` already skips hash links (`&& !target.hash`) so Contact
  never gets a false `aria-current="page"`.

  Two knock-ons. The connect band's own button could not point at the band it
  sits in, so it became an "Email me" mailto, matching the Email button in the
  full footer elsewhere; and the lede's "or use the contact page" clause was
  dropped for the same reason. **If module 5 ever builds a real `/contact/`,
  grep for `#connect` — that is the full list of places to re-point.**

- **The site is one page plus piece pages, after Caleb's.** His nav never
  leaves the landing page — it scrolls to `#projects` / `#experience` /
  `#aboutme` / `#connect`. Adam asked for the same on 2026-08-27, so Contact
  is a **section of `index.html`** rather than a `/contact/` page. Modules 4
  and 5 were originally scoped as separate pages; that is no longer the plan.
  The nav is now just `/work/` · `/#connect`, byte-identical on all 11 pages.

- **The About section was built, then pulled the same day.** Adam asked for it
  ("like Caleb's"), reviewed it, and said "let's get rid of About for now" on
  2026-08-27. Removed cleanly: the `#about` section from `index.html` (126
  lines), the `.about__*` / `.role__*` block from `css/pages/home.css` (163
  lines), and the nav item from all 11 pages. Each page keeps a comment where
  the nav item was.

  **To rebuild it**, the content source is
  `../Documents/Adam_Velazquez_Resume.pdf` — note `Documents/`, not
  `Reference/`, whose copy is older. It held: a `TODO(content)` lede, four
  label/value facts (based in, languages, education, awards), the four roles
  reverse-chronological, five skills, and thirteen software pills. Two things
  worth not rediscovering — the two Buddha Jones entries are genuinely
  separate roles a year apart, not a duplicate; and software was plain text
  rather than the `.tool-chip` component, because that one carries a masked
  logo per tool and only nine tools have one.

  **The resume download buttons are unrelated and stayed.** They are in the
  hero CTA row and the connect band, and do not depend on the About section.

- **The resume ships from the repo, at `assets/docs/`.** Adam supplied it on
  2026-08-27 in the workspace's `Documents/` folder; the committed copy is
  `site/assets/docs/Adam_Velazquez_Resume.pdf` (92 KB). Download buttons are in
  the hero CTA row and the connect band, both `<a download>` — same-origin, so
  the browser saves rather than opening its PDF viewer.

  **`Documents/` is the live copy; `assets/docs/` is a snapshot.** Re-copy it
  when he updates the resume, or the site quietly serves a stale one. The
  version he supplied already differs from `../Reference/Adam_Velazquez_Resume.pdf`
  — two extra Buddha Jones bullets, and the "Realtime Visualization Artist"
  line dropped from under his name. The `#about` lede was updated to match;
  `Reference/`'s copy is now the older of the two, so prefer `Documents/`.

- **Folders named `DNU` are off limits.** Do-not-use. Adam said so on
  2026-08-27. Never read, list, copy from, or ship anything inside one —
  `Documents/DNU/` is the current instance.

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
  | Clockwork Revolution — Games Showcase 2025 | 2025 | yes |
  | Alien Rogue Incursion PS5 & PC Gameplay Reveal | 2025 | yes |
  | Alien Rogue Incursion Evolved Edition | 2025 | yes |
  | Docked — Life on the Docks | 2025 | yes |
  | Magic: The Gathering × Final Fantasy | 2025? | yes, with gaps |
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

- **The last three unbuilt briefs were built 2026-08-27**, taking `/work/`
  from nine cards to twelve: `clockwork-revolution-showcase-2025`,
  `alien-rogue-incursion-gameplay-reveal`, `docked-life-on-the-docks`. All
  three are scaffolded from the heist page, so the header, footer and theme
  script stay byte-identical across pieces. Grid thumbnails are the YouTube
  `maxresdefault` for each video, exported 800x450 WebP q80 — the same
  treatment Adam asked for on Covenant and Towerborne.

  **The brief filenames in `Alien Rogue Incursion/` do not match their
  contents.** `AlienRogue Incursion FlatScreen.md` holds the *Evolved Edition
  Announce* brief (`0Ho3DAL11eA`) — already built as
  `alien-rogue-incursion-announce`. The unbuilt piece was in
  `AlienRogue Incursion Evolved Edition GameplayReveal.md`, which actually
  holds the *PS5 & PC Gameplay Reveal* (`LnfXZJdOkGk`). The table row that read
  "Flatscreen" was this one — flatscreen as opposed to the original VR release.
  Go by a brief's `Title:` and video id, never its filename.

  **Two tools have no chip logo.** Docked lists Unity and the gameplay reveal
  lists After Effects; `assets/img/tools/` has neither, and a `data-tool` with
  no matching selector paints a solid `currentColor` square. Both ship as
  text-only chips with the logo `<span>` omitted, which is the state the
  component's `@supports` fallback is already designed for. Add the SVGs per
  that folder's README if the marks are wanted.

  **What is deferred on these three, all marked `TODO(media)` inline:** the
  Docked storyboard comparison (one 300 MB master), the gameplay reveal's
  background plates (`MediaPool/AlienRogueIncursion/ARIE/`, and the brief also
  wants "placeholders for the 1x1 graphic internal cards" that Adam has not
  supplied), and the 2025 showcase shot gallery (five UHD masters, ~7 GB, needs
  an editorial pass on which shots make the cut). Nothing was stubbed with a
  `.placeholder` block — the sections are simply absent until the media exists.

  **The 2025 showcase brief has no `Copy:` line at all** — title, embed,
  credits, gallery, and it stops. No summary was invented; the page ships
  without a lede and carries a `TODO(content)` saying so. Ask Adam for a
  sentence on what he did on that cut.

  **They were not added to the landing page.** `#featured` is an explicitly
  curated "Selected work" list of five, and module 6 (featured pieces) is still
  open, so which of the twelve belong there is Adam's call, not a mechanical
  insert.

- **`MTGxFinalFantasy/MTGxFinalFantasy.md` is a copy of the Clockwork 2026
  brief; the page was built anyway on 2026-08-27 at Adam's direction**, from
  the video plus flagged assumptions rather than from a brief. Slug is
  `magic-the-gathering-final-fantasy`. **Four things on it are unverified and
  every one is marked `TODO(content)` in the page itself:**

  1. **The discipline is a guess.** "Cinematic Work" is printed because ten of
     the other twelve pieces are, and the same guess sets `data-discipline` on
     the `/work/` card, so the two must be corrected together.
  2. **Client says "Wizards of the Coast"** — certain as the property (the
     trailer is on the official @mtg channel), but whether Adam's client was
     Wizards directly or an agency in between is not known.
  3. **Studio and Tools rows are absent**, not guessed. Every other Buddha
     Jones piece prints all three.
  4. **There is no summary copy.** Nothing was invented; the page runs hero →
     embed → related, with the lede omitted.

  The year in the table above is a guess too — the trailer's own end card
  carries "© 2025 Wizards", and the card is slotted at the end of the 2025 run,
  before the 2026 pieces.

  The original problem stands: Every line is the Heist's: the `Title:` reads
  "Clockwork Revolution - The Heist | XBOX Games Showcase 2026", the embed is
  `6B5NUd6B9I4`, and the credits are InXile via Buddha Jones. It differs from
  `Cobalt/ClockworkRevolution - Games Showcase 2026.md` by exactly one line (a
  stray `sd`). **This is the fourth copied brief** — see the Towerborne note
  below for the other three.

  The piece itself is real: `MediaPool/FinalFantasyXMTG/` holds
  `..._Media_VSDvLerVcNU_001_1080p.mp4`, and `VSDvLerVcNU` resolves to "MAGIC:
  THE GATHERING | FINAL FANTASY | Official Trailer". So the video is known —
  what is missing is everything else: discipline, client, studio, tools, the
  summary copy, and the year for the ordering table. It is deliberately absent
  from that table until Adam saves a real brief over that file.

- **Towerborne opening cinematic: built 2026-08-27, embed resolved 2026-08-27.**
  Adam saved the real copy over `Towerborne Opening Cinematic 2024.md` the same
  day. `/work/towerborne-opening-cinematic/` is built from it: Stoic Studio /
  Buddha Jones, Blender only, his summary verbatim (except "Xbox games studios"
  set as the proper noun "Xbox Game Studios" — flagged inline).

  **Its `[featured:]` id was wrong and was never shipped.** The brief gives
  `_eSfwxNYKA4`, which is byte for byte the id already embedded on the reveal
  trailer page. A YouTube id maps to exactly one video, so the two pages cannot
  both be right — the line survived a copy-paste. The embed shipped as a
  `.placeholder` until Adam supplied the watch URL on 2026-08-27; the real id is
  **`_7Wlmk4pOtE`** and the standard embed is now in place.

  The guess from the filename was one character short, not truncated at the end:
  the MediaPool download is named `..._Media_7Wlmk4pOtE_001_1080p.mp4` and the
  downloader had stripped the **leading underscore**, leaving 10 characters
  against YouTube's 11. Worth remembering — a YouTube id may legitimately begin
  with `_` or `-`, and tools that build filenames tend to eat it.
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
