/**
 * pieces.js — the catalogue. One entry per portfolio piece.
 *
 * This is the data behind js/modules/relatedWork.js, which builds the related
 * grid at the foot of every piece page. It replaced a hand-written pair of
 * links per page plus a slug → thumbnail map in CSS, both of which had to be
 * edited by hand every time a piece shipped and both of which silently went
 * stale when one was renamed.
 *
 * ADDING A PIECE: add its object here AND its card to the landing grid in
 * index.html. Those are still two edits — the landing grid is hand-written
 * markup so it works with JS off, which is the one place that matters most.
 * Keep the order identical in both.
 *
 * ORDER IS CURATED, NOT CHRONOLOGICAL — Adam picked the first five by hand on
 * 2026-08-28 (Alien Rogue Evolved Edition Announce, Docked, Covenant, State of
 * Decay 3, Avowed) and the rest keep the by-upload-date run they had before. Nothing
 * reads this order any more — relatedWork.js draws at random — so it exists
 * only to mirror the landing grid. See docs/ROADMAP.md.
 *
 * FIELDS
 *   slug    URL path. Must match the folder under work/ exactly.
 *   title   Display title. Line two is the subtitle, softened in the card.
 *   client  Studio credit, as printed on the landing card.
 *   year    Printed year (see the caveat above).
 *   thumb   800x450 WebP, the same file the landing grid uses.
 *   group   Relatedness key: pieces sharing a group are the same project or
 *           franchise. CURRENTLY UNREAD — relatedWork.js ranked on it until
 *           2026-08-28, when Adam made the pick random. Kept because it is the
 *           only record of which pieces belong together, and re-ranking is a
 *           dozen lines if that is ever wanted back. Keep it accurate on new
 *           entries.
 */

export const PIECES = [
  {
    slug: "/work/alien-rogue-incursion-announce/",
    title: ["Alien Rogue Incursion", "Evolved Edition Announce Trailer"],
    client: "Survios & 20th Century Games",
    year: "2025",
    thumb: "/assets/img/alien-rogue-incursion/announce.webp",
    group: "alien-rogue-incursion",
  },
  {
    slug: "/work/docked-life-on-the-docks/",
    title: ["Docked", "Life on the Docks"],
    client: "Saber Interactive",
    year: "2025",
    thumb: "/assets/img/docked/life-on-the-docks.webp",
    group: "docked",
  },
  {
    slug: "/work/covenant/",
    title: ["Covenant"],
    client: "Legion Studios",
    year: "2024",
    thumb: "/assets/img/covenant/reveal-trailer.webp",
    group: "covenant",
  },
  {
    slug: "/work/state-of-decay-3-gameplay-trailer/",
    title: ["State of Decay 3", "Gameplay Trailer"],
    client: "Undead Labs",
    year: "2026",
    thumb: "/assets/img/state-of-decay-3/gameplay.webp",
    group: "state-of-decay",
  },
  {
    slug: "/work/avowed-times-square-billboard/",
    title: ["Avowed Times Square", "Anamorphic Billboard"],
    client: "Obsidian Entertainment",
    year: "2025",
    thumb: "/assets/img/avowed/times-square.webp",
    group: "avowed",
  },
  {
    slug: "/work/clockwork-revolution-heist/",
    title: ["Clockwork Revolution", "The Heist — Xbox Games Showcase 2026"],
    client: "InXile",
    year: "2026",
    thumb: "/assets/img/clockwork-revolution/heist.webp",
    group: "clockwork-revolution",
  },
  {
    slug: "/work/clockwork-revolution-showcase-2025/",
    title: ["Clockwork Revolution", "Xbox Games Showcase 2025"],
    client: "InXile",
    year: "2025",
    thumb: "/assets/img/clockwork-revolution/showcase-2025.webp",
    group: "clockwork-revolution",
  },
  {
    slug: "/work/magic-the-gathering-final-fantasy/",
    title: ["Magic: The Gathering × Final Fantasy", "Official Trailer"],
    client: "Wizards of the Coast & Square Enix",
    year: "2025",
    thumb: "/assets/img/magic-the-gathering/final-fantasy-trailer.webp",
    group: "magic-the-gathering",
  },
  {
    slug: "/work/alien-rogue-incursion-gameplay-reveal/",
    title: ["Alien Rogue Incursion", "PS5 & PC Gameplay Reveal"],
    client: "Survios & 20th Century Games",
    year: "2025",
    thumb: "/assets/img/alien-rogue-incursion/gameplay-reveal.webp",
    group: "alien-rogue-incursion",
  },
  {
    slug: "/work/towerborne-opening-cinematic/",
    title: ["Towerborne", "Opening Cinematic"],
    client: "Stoic Studio",
    year: "2024",
    thumb: "/assets/img/towerborne/opening-cinematic.webp",
    group: "towerborne",
  },
  {
    slug: "/work/alien-rogue-incursion-story-reveal/",
    title: ["Alien Rogue Incursion", "Story Reveal Trailer"],
    client: "Survios & 20th Century Games",
    year: "2024",
    thumb: "/assets/img/alien-rogue-incursion/story-reveal.webp",
    group: "alien-rogue-incursion",
  },
  {
    slug: "/work/obsidian-20th-anniversary-logo/",
    title: ["Obsidian Entertainment", "20th Anniversary Logo"],
    client: "Obsidian Entertainment",
    year: "2023",
    thumb: "/assets/img/obsidian-20th/logo.webp",
    group: "obsidian",
  },
  {
    slug: "/work/towerborne-official-reveal-trailer/",
    title: ["Towerborne", "Official Reveal Trailer"],
    client: "Stoic Studio",
    year: "2023",
    thumb: "/assets/img/towerborne/official-reveal-trailer.webp",
    group: "towerborne",
  },
];
