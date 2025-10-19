// src/app/data/books.ts

export type Book = {
  slug: string;             // URL: /book/[slug]
  title: string;
  authors: string[];        // ["Rachel Rain Martin", "Tatiana Kutsachenko (Illustrator)"]
  cover: string;            // e.g. "/img1.png"
  hero?: string;            // optional banner
  status: "published" | "coming-soon";
  rating?: number;          // 0–5
  readingAge?: string;      // "6 - 8 years"
  language?: string;        // "English"
  pages?: number;           // 24
  dims?: string;            // "8 x 0.06 x 8 inches"
  releaseDate?: string;     // "May 15, 2024"
  blurb: string;            // description paragraph(s)
  buyLink?: string;         // external link (Amazon etc.)
};

export const books: Book[] = [
  // ---------------- PUBLISHED ----------------
  {
    slug: "on-the-bluffs-of-cane-creek",
    title: "On the Bluffs of Cane Creek",
    authors: ["Rachel Rain Martin"],
    cover: "/img1.png",
    hero: "/hero.png",
    status: "published",
    rating: 4.9,
    language: "English",
    pages: 320,
    dims: "6 x 9 inches",
    blurb:
      `A haunting, poetic journey through time and memory, “On the Bluffs of Cane Creek” tells the story of a young woman’s search for truth in a town haunted by the past.`,
  },
  {
    slug: "montana-dreamer",
    title: "Montana Dreamer",
    authors: ["Rachel Rain Martin"],
    cover: "/img2.png",
    status: "published",
    rating: 4.8,
    language: "English",
    pages: 280,
    dims: "6 x 9 inches",
    blurb:
      `A tender story about love, loss, and finding strength in wide Montana skies.`,
  },
  {
    slug: "ashes-of-richmond",
    title: "Ashes of Richmond",
    authors: ["Rachel Rain Martin"],
    cover: "/img3.png",
    status: "published",
    rating: 4.7,
    language: "English",
    pages: 310,
    dims: "6 x 9 inches",
    blurb:
      `Amid war and fire, courage rises. “Ashes of Richmond” follows the intertwined lives of two families surviving the aftermath of conflict.`,
  },
  {
    slug: "ghosts-of-luna-creek",
    title: "Ghosts of Luna Creek",
    authors: ["Rachel Rain Martin"],
    cover: "/img4.png",
    status: "published",
    rating: 4.8,
    language: "English",
    pages: 295,
    dims: "6 x 9 inches",
    blurb:
      `When tragedy strikes in a small Appalachian town, echoes of the past return in mysterious ways. “Ghosts of Luna Creek” blends mystery and magic into a timeless tale.`,
  },
  {
    slug: "talking-with-tomas",
    title: "Talking with Tomas",
    authors: ["Rachel Rain Martin"],
    cover: "/img5.png",
    status: "published",
    rating: 4.9,
    language: "English",
    pages: 250,
    dims: "6 x 9 inches",
    blurb:
      `A story of forgiveness and rediscovery, “Talking with Tomas” explores how old wounds can heal through the power of empathy and truth.`,
  },

  // ---------------- COMING SOON ----------------
  {
    slug: "tales-from-turniptown-creek",
    title: "Tales from Turniptown Creek",
    authors: ["Rachel Rain Martin"],
    cover: "/cm1.png",
    hero: "/header2.png",
    status: "coming-soon",
    blurb:
      `When the extraordinary meets the unknown — a mysterious river town where every whisper carries a story.`,
  },
  {
    slug: "is-the-mail-up-yet",
    title: "Is The Mail Up Yet?",
    authors: ["Rachel Rain Martin"],
    cover: "/cm2.png",
    status: "coming-soon",
    blurb:
      `A humorous, heartwarming look into small-town life — full of gossip, surprises, and old-fashioned charm.`,
  },
  {
    slug: "a-new-sheriff-in-olde-towne",
    title: "A New Sheriff in Olde Towne",
    authors: ["Rachel Rain Martin"],
    cover: "/cm3.png",
    status: "coming-soon",
    blurb:
      `Romance and redemption collide in this exciting addition to the Sisters McConnell series.`,
  },
];

export const getBook = (slug: string) => books.find((b) => b.slug === slug);
