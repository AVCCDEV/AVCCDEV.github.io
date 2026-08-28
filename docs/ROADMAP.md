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
- [x] **3 — Work index** — built as `/work/` (grid, lazy thumbnails,
      discipline filter), then **retired on 2026-08-27**: the listing moved
      onto the landing page as the only work section. See the Decisions note
      "One work section, on the landing page".
- [ ] **4 — About** — was built as a landing-page section and **pulled again
      on 2026-08-27** at Adam's direction. It is not lost: see the Decisions
      note below for what it held and how to put it back.
- [x] **5 — Contact** — the landing page's closing band, rebuilt 2026-08-27.
      Copy is now "Let's make something great!" (the "Connect / Let's talk."
      eyebrow-and-title pair is gone; the `#connect` id stays, because the
      header's Contact button and the hero's "Get in touch" both point at it).
      A three-field form posts to **Web3Forms** — Adam's pick over Formspree —
      beside the pitch, with Email me / Resume / LinkedIn still under the copy.
      Became a reusable block on 2026-08-28 — see module 8, and **went live
      the same day** when Adam supplied the Web3Forms access key. See the
      Decisions note "The contact form is live".
- [x] **8 — Related work + shared connect band** — 2026-08-28. Both are now
      JS-built modules rendering into a placeholder, so a piece page carries
      `<section data-related-work>` and `<section data-connect-band>` and
      nothing else. Related work reads `js/data/pieces.js` and ranks by group,
      then client, then catalogue neighbours; it replaced `.piece-nav`, two
      hand-written links per page plus a slug -> thumbnail map in CSS. All
      thirteen piece pages now close on the same contact band as the landing
      page, with `.site-footer--minimal` under it.

- [ ] **6 — Landing finish** — hero copy, featured pieces, social links,
      the "logo garden" of flippable cards from Adam's sketch.
- [ ] **7 — Deploy & polish** — `CNAME`, real canonical/OG URLs, 404,
      favicons, share image, `sitemap.xml`, `robots.txt`, Lighthouse, enable
      Pages.

## Blocked on Adam

- **Domain** — for `CNAME` and the `SITE_URL` placeholders.
- **Repo URL** — to add the remote and push.
- ~~**Web3Forms access key**~~ — **done 2026-08-28.** See the Decisions note
  "The contact form is live". One item remains on it: Adam still has to send
  one real message through the form and confirm it arrives, because the free
  plan refuses non-browser requests and there is no other way to test it.
- **Social links** — Instagram and ArtStation. **LinkedIn is done**
  (supplied 2026-08-27, live in the connect band and every page footer);
  the other two are still `href="#"`-shaped holes. The markup comment
  beside the LinkedIn button in each file says where they go.
- **Git history is 33 MB** against a ~1 MB tree — the deleted 32 MB Obsidian
  trailers persist in it. Unpushed, so it can still be rewritten; destructive,
  so ask first.

## Decisions

- **One work section, on the landing page.** Adam merged the landing page's
  five-piece "Featured work" teaser and the thirteen-card `/work/` grid into a
  single section on 2026-08-27. `#featured` on `index.html` now holds every
  piece; `work/index.html`, `css/pages/work.css` and `js/modules/filter.js`
  were deleted, and `initFilter` came out of `main.js`. The `work/<slug>/`
  piece pages are untouched — only the index above them is gone, so every
  existing piece URL, canonical and OG tag still resolves.

  **The layout changed shape, not styling.** It was full-width rows alternating
  artwork and copy side to side; it is now a card grid that steps 1 → 2 → 3
  columns at 46rem and 70rem, each card stacking artwork over copy. Three
  across the 84rem container is a ~26rem card, which is the narrowest that
  reads well — pick breakpoints off the card width, not the viewport, if you
  retune it. The `.feature--flip` modifier went with the rows, and the
  "View all work" button under the list went with the page it pointed at.

  Two knock-on details worth not rediscovering. Display type could no longer be
  a single `vw` clamp — 1.8vw is comfortable in one column and absurd in three
  at the same viewport — so each breakpoint sets its own `--feature-title-size`
  on `.feature`. And cards in a row need `View Breakdown` on a common baseline,
  which is why `.feature__body` is `flex: 1` in a column and the link takes
  `margin-top: auto`; its gap above the paragraph is `padding-top`, not margin,
  or the auto margin would lose.

  **Cards carry no body copy.** Each repeated its piece page's summary
  paragraph for about an hour before Adam cut them the same day — a card is now
  artwork, client, year, title and the link. The copy is untouched on the piece
  pages, which is what the link opens, so nothing was lost. Its label is
  **"See more"**; it was "View Breakdown" until the same pass.

  **The fade-in and the stretched card link are unchanged.** `data-reveal`
  still drives the scroll-in, and `.feature__link::after` still stretches over
  the whole card so each piece is one link and one tab stop.

- **The header is two buttons and no hamburger, at every width.** Same day,
  same call. With `/work/` retired both destinations are landing-page sections,
  so Adam asked for Work to scroll to `#featured` the way Contact scrolls to
  `#connect`, and for both to stay on the bar at all sizes. That removed the
  `.site-nav` list, the off-canvas panel, `.nav-toggle` and its bar-to-X
  animation. Nothing in the bar hides below a breakpoint any more — the sizes
  step down instead, at 48rem and again at 30rem. The 320px budget is written
  out in a comment on that second block in `site-header.css`; recheck it there
  before adding a third button, because a third does not fit.

  **`js/modules/nav.js` lost two of its three functions.** `initMobileMenu`
  had no markup left to drive, and `initCurrentLink` had no page-valued link
  left to mark — both bar links carry a hash, which that function skips by
  design. Only `initScrolledState` remains. If a real second page ever returns
  to the bar, restore the `aria-current` marker from git history rather than
  rewriting it; the matching `.site-nav__link[aria-current="page"]` styling
  went out of `site-header.css` at the same time.

  The hero's "View the work" button was repointed from `/work/` to `#featured`
  in the same pass. `grep -rn 'href="/work/"'` should return nothing.

- **Clockwork Revolution — Xbox Games Showcase 2025 finally has summary copy.**
  Adam added it to `Reference/DetailPages/Cobalt/ClockworkRevolution - Games
  Showcase 2025.md` on 2026-08-27; it is on the landing card verbatim. **The
  piece page itself still has no `.piece-lede`** — it was built before the copy
  existed and is hand-maintained, so it needs the same paragraph added by hand.
  That brief also now lists After Effects in its Logo Garden, which the page's
  Tools row does not carry.

- **Clients and studios print as their own wordmarks, not as text.** Adam chose
  this on 2026-08-27 over the alternative of a separate credits band lower down
  the page. `css/components/company-mark.css` + `assets/img/companies/`; nine
  marks, 73 KB all in. Same `mask-image` + `currentColor` trick as the tool
  chips, so one file serves both themes.

  **On a standalone mark the name is the element's text, not a sibling span.**
  It is pushed out of the box by `text-indent`, so it stays in the accessibility
  tree and in the page text, and it is what renders when `mask-image` is
  unsupported — every rule that turns it into a logo lives inside `@supports`.
  A labelled mark needs none of that: its name is already visible, and its logo
  child is `display: none` until `@supports` turns it on.

  **Three companies still print as text** because no mark was supplied:
  **Buddha Jones** (the studio on 12 of 13 pieces, so this is the conspicuous
  one), **Square Enix**, and **20th Century Games**. The component handles that
  by design — omit `data-company`. Drop a mark in and add one selector.

  **A mark only replaces the name if it actually says the name.** Adam added
  this rule on 2026-08-27: marks that are square-ish (ratio < 1.5) or carry no
  lettering take `.company-mark--labelled` and print the name beside the logo —
  Xbox Game Studios, Undead Labs, Legion Studios. The rest stand alone. Base
  height went to 1.92em the same day, up from 1.6em.

  **Do not set the standalone marks to a single box height.** They run from a
  5.3:1 wordmark to a stacked crest, and at equal box height the crest reads
  about a third the weight. Each carries a `--company-scale` derived from its
  own ink area; the arithmetic is in the folder's README. Re-crop a mark and
  both its numbers have to be recomputed. Labelled marks bypass this and use
  the base height flat — their name is printed in real type, so there is no
  baked-in lettering to rescue.

  **The marks step down on small screens** (2026-08-27) — 1.92em, then 1.5em
  under 48rem, then 1.3em under 30rem. On a phone the meta block sits directly
  above the trailer, so its height is what pushes the video down the page, and
  at full size these are the tallest thing in it at roughly twice the body
  text. One knob does it: `--company-mark-base` on `.company-marks`. Checked
  down to 320px — nothing overflows, and `.company-marks` wraps anyway.

  The tool-chip logos come down with them (1.15rem to 1rem to 0.9rem), but
  that is cosmetic only: a chip is as tall as its text plus padding, and the
  logo is already smaller than that, so it reclaims no vertical space.

  **Width is spelled out, not left to `aspect-ratio`** — a flex item sizes from
  its content first, and the content here is a long company name.

  Sources were black-on-transparent. Marks with internal white detail (Undead
  Labs' skull, Stoic's wave, the Xbox sphere) were **knocked out rather than
  flattened**, so they survive and still invert correctly in light theme.

- **Maya, Houdini, and Blender are Adam's own badge conversions**, swapped in
  on 2026-08-27 for the traced/extracted SVGs that preceded them. They are the
  real product badges — Maya's sheet with the letterforms knocked out of it,
  Houdini's plate with the spiral knocked out — not isolated glyphs, so they
  read heavier than what they replaced. That is intended; do not "fix" it back.
  The old `maya.svg`, `houdini.svg`, and `blender.svg` were deleted.
  `unreal-engine.svg` is untouched, as `MediaPool/Logos/` has no art for it.

- **The tool marks are still incomplete: Unity, After Effects, and Photoshop
  have no logo** and print as text chips, on `/work/docked-life-on-the-docks/`,
  `/work/alien-rogue-incursion-gameplay-reveal/`, and
  `/work/magic-the-gathering-final-fantasy/` respectively. All three appear in
  Adam's briefs' Logo Gardens. `MediaPool/Logos/` has no art for them, and
  pulling marks off the web is Adam's call, not ours. If art turns up, the
  conversion recipe is in `assets/img/tools/README.md`.

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
  As of 2026-08-27 **every** bar destination is a landing-page section:
  `/#featured` · `/#connect`, byte-identical on all 14 pages.

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

- **Work order is curated, not chronological (2026-08-28).** Adam picked the
  first five by hand and named them in this order: **Alien Rogue Incursion
  Evolved Edition Announce, Docked, Covenant, State of Decay 3, Avowed Times
  Square.** (The PS5 & PC Gameplay Reveal led it for a few minutes on the same
  day; he swapped the two Alien Rogue trailers, so the announce leads and the
  gameplay reveal sits at 9.) Everything after them keeps the by-upload-date run that used to
  govern the whole list, so the tail still descends and the head does not.
  **The years no longer run monotonically down the page and are not meant to.**

  A new piece goes wherever Adam says — ask, do not slot it by date. The list
  exists in two places and they must match: the grid in `index.html` and
  `js/data/pieces.js`. Nothing *reads* the catalogue order any more (related
  work draws at random since the same day), so it is there to mirror the grid.

  Ordering ran by year, oldest first, until 2026-08-27, when Adam reversed it
  and changed the key to each piece's YouTube upload date. Those dates are
  below and still govern rows 6-13. They were read off the `watch` pages
  (`"uploadDate"` in the page JSON); they are a property of the video, so
  re-read one rather than guess. The **Year** column is separate — it is what
  the card prints, and it is the year Adam gave for the *work*, which is not
  always the year the video went up.

  | Piece | Uploaded | Year | Built |
  | --- | --- | --- | --- |
  | Clockwork Revolution — The Heist | 2026-06-07 | 2026 | yes |
  | State of Decay 3 | 2026-06-07 | 2026 | yes |
  | Docked — Life on the Docks | **2026-02-26** | 2025 | yes |
  | Alien Rogue Incursion PS5 & PC Gameplay Reveal | 2025-07-25 | 2025 | yes |
  | Clockwork Revolution — Games Showcase 2025 | 2025-06-08 | 2025 | yes |
  | Magic: The Gathering × Final Fantasy | 2025-05-10 | 2025 | yes, with gaps |
  | Alien Rogue Incursion Evolved Edition Announce | 2025-05-08 | 2025 | yes |
  | Towerborne Opening Cinematic | **2025-05-04** | 2024 | scaffold |
  | Avowed Times Square | *no embed* — 2025-02 | 2025 | yes |
  | Covenant | 2024-12-06 | 2024 | yes |
  | Alien Rogue Incursion Story Reveal | 2024-11-18 | 2024 | yes |
  | Obsidian 20th Anniversary Logo | 2023-06-12 | 2023 | yes |
  | Towerborne Official Reveal Trailer | 2023-06-11 | 2023 | scaffold |

  **The table is in upload-date order, which is no longer page order** — see
  the curated order above for what the page actually shows. The reveal stagger
  (`data-reveal-delay` 0/80/160) repeats straight down the list regardless of
  how many columns are showing, so inserting a piece mid-list reflows the
  delays on every card after it.

  **Two rows are bolded because their upload year and their printed year
  disagree.** Adam supplied 2024 for Towerborne Opening Cinematic (its brief is
  filed as "2024" and says he was brought on "the following year" after the
  2023 reveal) and 2025 for Docked; both videos went up later than the work.
  This mattered when the page ran strictly by upload date and seated a 2024
  card above a 2025 one. It matters less now the head of the list is curated
  and the years jump about anyway, but the discrepancy is still real — if the
  labels are ever wanted monotonic, the fix is to print the upload year on
  those two cards, not to reorder.

  **Avowed Times Square is the only piece with no YouTube embed** — its page
  self-hosts the video. It is slotted at February 2025: the ad ran for the
  Avowed early-access launch, which is also when the Bluesky post its brief
  links was made.

- **The discipline filter is gone.** Its three values were `cinematic`,
  `titles`, and `gameplay` (Covenant added the third on 2026-08-27 — it is
  animation work, not a cinematic). It was removed later the same day with the
  `/work/` page: `js/modules/filter.js`, the `data-discipline` attributes and
  the button row all went. Nothing else read those values. If filtering comes
  back on the landing grid, the module is one `git show` away.

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

  **Houdini now has a mark (2026-08-27).** Originally `houdini.svg`, traced
  from the Commons PNG icon; **superseded later the same day** by
  `houdini.png`, Adam's own conversion of the real badge — see the tool-mark
  decision above. The `[data-tool="houdini"]` rule is at the bottom of
  `tool-chip.css` and the reveal page's chip carries its logo.
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

- **The page closes tight, on purpose.** Before 2026-08-27 the landing page put
  ~16rem of empty background between the last work card and the connect band —
  a full `--section-y` under `.featured` plus another over `.connect` — which
  read as the end of the document a screen early. `.featured` now has no bottom
  padding, `.feature-list` carries a short bottom margin, and the band's own
  padding is the only other gap; its sunken background and top border do the
  separating. The measured gap from last card to band is 42px at 1440, 27px at
  900, 24px at 500. Restoring either padding brings the dead space back.

- **`.feature-list`'s `padding-block` never applied.** base.css resets
  `ul[role="list"] { padding: 0 }`, and that attribute selector outranks the
  class, so the grid's declared padding had been dead since it was written.
  Found and replaced with margin on 2026-08-27. Check for this any time a list
  in `pages/` or `components/` ignores its padding.

- **The whole site scrunched vertically on 2026-08-28**, at Adam's direction:
  he wanted the next section visible before the current one runs out, so a
  visitor always knows there is more to scroll to. `--section-y` went from
  `clamp(3rem, 7vw, 8rem)` to `clamp(2rem, 5vw, 6rem)` — one token, and
  `.section`, `.piece-section`, `.related-work` and the connect band all
  followed. The piece hero's lead-in and the landing section head came down
  with it. A piece page lost roughly 500px of empty background.

- **Related work is deliberately downplayed.** Adam's call on 2026-08-28,
  after seeing it at three fat columns: it must not read as a second portfolio
  under the piece's own work.

  **Three cards, and the card never grows.** Two columns on a phone (a pair and
  a single), three columns above 40rem, and that is the end of it. The columns
  are capped at 17rem and `justify-content: space-between` spends every extra
  pixel of viewport on the two gaps instead — measured, the card holds at 272px
  from ~1000px up while the gaps open from 16px to 216px, and the row spans the
  container so its outer cards line up with the artwork above. `1fr` columns
  would hand the whole 84rem container to three cards and give the block back
  the prominence it exists to give up.

  The card also lost its "See more" row (the whole card is one link now), the
  heading is a small caps label rather than display type, and the credit line
  reserves two lines so the titles align across a row. If you make any of this
  bigger again, you have undone the point of the block.

- **Related work is data-driven now.** `js/data/pieces.js` is the catalogue and
  the only place a new piece has to be registered for every other page to be
  able to link to it. Its order is the same "newest by upload date" order as
  the landing grid, and the two must be kept in step by hand — the landing grid
  stays static markup so the work listing survives with JS off.

- **Module 9 — landing polish and deferred media (2026-08-28).** Six changes
  Adam asked for in one pass.

  **Featured work is curated at the head** — see the ordering decision above.

  **The featured grid got bigger on desktop, keeping three columns.** Offered
  two big columns or three tighter ones, Adam took three. `home.css`'s 70rem
  block now runs `.featured > .container` to `min(112rem, 100%)` on a
  `--space-6` gutter and halves the column gap to `--space-4`; the row gap goes
  flat at `--space-6` instead of clamping to its 4rem ceiling. Nearly all the
  extra width is the container, not the gap: at 1440 the 84rem page container
  was already narrower than the viewport, so the gap alone bought ~5%, while at
  1920 it had been leaving ~290px of dead margin down each side. Artwork goes
  from 240px tall to ~330px there, and a row is a little under half a 16:9
  screen. **112rem is `.piece-media--bleed`'s number**, deliberately — the site
  has one idea of "wider than the text column".

  **`.featured` carries a NEGATIVE `scroll-margin-top`** (`--space-6`, desktop
  only) so the header's Work button lands with the second row peeking rather
  than flush on the first, which read as "that is the whole list". It comes out
  of the section's own top padding, which is empty, so nothing visible is cut.
  ~75px of peek at 1366x768 and more on anything larger. **Not below 70rem** —
  `--section-y` is down to 2rem on a phone and there is no padding to spend.

  **`js/modules/scrollHint.js` is new**: on the landing page only, `<main>`
  translates up ~7% of the viewport (max 64px) and bounces back once, 1.1s
  after load. Chosen over animating `window.scrollY`, which fights the
  visitor's own input and pollutes scroll restoration; a transform changes no
  scroll position, and the header is a sibling of `<main>` so it stays put and
  the page reads as peeking under it. Bails on `prefers-reduced-motion`, on any
  hash or non-zero scroll, on a page that does not overflow, and on the first
  wheel/touch/pointer/key/scroll event. Selected by `data-scroll-hint`, which
  only `index.html` carries.

  **Related work now draws at random** (`relatedWork.js`). The group → client
  → neighbours ranking is gone: it was deterministic, so every visitor saw the
  same three cards on a given page forever, and the Alien Rogue and Clockwork
  pages could only ever offer each other. Pins (`data-related-work`) still come
  first, in order. **`group` in `pieces.js` is now unread** — kept as the only
  record of which pieces belong together, and because re-ranking is a dozen
  lines if it is ever wanted back.

  **Obsidian 20th: the two videos swapped slots.** The self-hosted isolated
  logo is now the featured media directly under the hero, and the YouTube
  release is the sample below the summary. Adam's call — the isolated cut is
  the piece itself, with no third-party chrome.

  **Docked's storyboard comparison shipped.** The encode had been sitting in
  `assets/video/docked/` since 2026-08-27; only the markup was missing. Unlike
  the Towerborne and Alien Rogue comparisons this one keeps its mp4 fallback.

- **The Alien Rogue internal cards are on the GAMEPLAY REVEAL page, not the
  story reveal (2026-08-28).** Six title-card clips (`Midnight_ARIE_IC_*.mp4`,
  0.4-3.0 s each, 1920x1080 59.94) encoded at `loop` into
  `assets/video/alien-rogue-incursion/card-*` — 2.3 MB for all six, both
  sources kept.

  **It was eight until Adam combined three of them.** He supplied
  `Midnight_ARIE_IC_FaceYourFear.mp4` later the same day and asked for it in
  place of the separate Face / Your / FEAR cards; those three encodes were
  deleted (never committed) and their manifest lines replaced by one.

  **Two captions are taken off the posters, not the filenames**: the card reads
  "Re-envisioned Features", hyphenated, over a two-line subtitle.

  **That combined clip was re-cut four times in the hour it landed, and the
  markup never changed once** — each export re-encoded straight from the
  manifest. Worth recording because it is the pipeline working exactly as
  intended: the piece page names an *output*, not a master, so a re-export is
  `./compress.sh` and nothing else. Repointing to a differently-named master
  (`..._Intercut.mp4`) was likewise one field in `manifest.tsv`.

  The shipping cut is the fourth, **`Midnight_ARIE_IC_FaceYourFear_Intercut.mp4`,
  4.72 s: FACE → xenomorph → YOUR → action → FEAR → gameplay, then black.** The
  history, because two of these files are still sitting in MediaPool: the first
  export was missing its FACE beat entirely (opened on "YOUR" at frame 0,
  1.5 s); the second ran 2.72 s; the third is the tight 1.77 s cut still there
  as `Midnight_ARIE_IC_FaceYourFear.mp4` — **superseded, not deleted.**

  **The black tail is deliberate.** `blackdetect` puts solid black over the last
  half second (4.204 → 4.705) plus gaps at 3.203-3.420 and 3.687-3.954, so this
  loop sits dark for about a second before repeating while the other five cards
  keep moving. Flagged to Adam; he asked to keep it. **Do not trim it back.**

  **Check a supplied clip rather than trusting its filename.** The missing beat
  was caught by stepping the master, and the check is one command:

  ```sh
  ffmpeg -i <clip> -frames:v 1 -vf \
    "fps=8,scale=400:-2,drawtext=text='%{pts\:hms}',tile=5x3" sheet.png
  ```

  **Its poster is hand-picked, and on this cut it has to be.** `compress.sh`
  always grabs 40% in, which here is t=1.89 s — *inside* one of the black
  windows above. That produced a 9 KB near-black poster on a card whose whole
  job is its lettering, in a grid where **the other five posters all carry
  theirs.** Taken at t=0.30 s ("FACE", where the loop starts) with the script's
  own scale and quality flags. **A `compress.sh --force` overwrites it and
  nothing warns you** — the restore is a single line in `manifest.tsv` beside
  that entry. This override came and went twice while the cut was changing; it
  is needed for as long as the master ends on black.

  **Adam named the story reveal trailer first and corrected it the same day.**
  Worth recording, because the trap will recur: the files live under
  `MediaPool/AlienRogueIncursion/ARIE/`, and ARIE is the *Evolved Edition*. The
  cards read "THE NEXT EVOLUTION" and "REENVISIONED FEATURES"; the story reveal
  trailer went up 2024-11-18, before that edition existed. **Go by the copy on
  the card, not the folder it arrived in** — and the gameplay reveal's brief is
  the one that asks for "placeholders for the 1x1 graphic internal cards".

  They ship as `.piece-loops--dense` (new in `piece.css`): eight clips two-up
  is four rows for content that is one word each, so it is `auto-fit` off a
  17rem minimum instead. **That rule has to stay below the 48rem `.piece-loops`
  block** — one class each, so only source order decides.

  **Half of that page's deferred media is now closed.** What is left is the raw
  BG plates (`_1x1_2997_BG_BGPlate_AlienBokeh*.mov`, still unencoded) and,
  before they can be built as the brief's side-by-side comparison, knowing
  which plate goes under which card. Ask Adam.

- **The contact form is live (2026-08-28).** Adam supplied the Web3Forms access
  key and it is in `js/modules/connectBand.js`. `grep -rn "TODO(setup)"` now
  returns nothing across the whole site, which was the gate on shipping the
  landing page.

  **The key is public by design — do not treat it as a leaked secret.** It
  names the form, not the account: it cannot read past submissions, change the
  delivery address, or do anything but post to this one form. Web3Forms is
  built to have it sitting in client-side markup, and this is a no-build site
  with nowhere else to put it. So it belongs in the commit, it does not need
  rotating, and it must not be moved into an environment variable by a future
  pass trying to be careful.

  **It cannot be tested from a shell.** The free plan refuses non-browser
  requests — a curl to the endpoint returns `403 {"success": false, "message":
  "This method is not allowed. Use our API in client side ..."}` no matter how
  well-formed the payload is. That is not a bug in our request and not a bad
  key; it is the plan. **The only valid test is a real submission from a real
  page in a browser**, so this is one of the few things a session genuinely
  cannot verify for itself.

  **The plumbing was audited when the key went in** and needed no changes: the
  fields are named `name` / `email` / `message`, which is what Web3Forms
  expects and what makes replies go back to the sender; `subject` and
  `from_name` are set; the `botcheck` honeypot is wired per their docs.

  **`contactForm.js` keeps its missing-key guard** (`key.value.includes("TODO")`
  → `console.warn`). It is dormant now and worth leaving that way — it is what
  catches the key being dropped in a future refactor.
