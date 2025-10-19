// app/data/books.ts
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
  {
    slug: "a-magical-day",
    title: "A Magical Day",
    authors: ["Rachel Rain Martin (Author)", "Tatiana Kutsachenko (Illustrator)"],
    cover: "/img1.png",
    hero: "/hero.png",
    status: "published",
    rating: 5.0,
    readingAge: "6 - 8 years",
    language: "English",
    pages: 24,
    dims: "8 x 0.06 x 8 inches",
    releaseDate: "May 15, 2024",
    blurb:
      `In "A Magical Day" by Rachel Rain Martin, a young girl is captivated by the sea's mysteries...`,
    // buyLink: "https://www.amazon.com/dp/XXXXXXXX",  // apna link
  },
  {
    slug: "tales-from-tumptown-creek",
    title: "Tales from Tumptown Creek",
    authors: ["Rachel Rain Martin"],
    cover: "/cm1.png",
    hero: "/header2.png",
    status: "coming-soon",
    blurb: "Short teaser / coming soon description...",
    buyLink: "", // jab live ho to add kar dena
  },
  // ...baqi books yahan add karein
];

// Helper (re-use on pages)
export const getBook = (slug: string) => books.find(b => b.slug === slug);
