// src/app/page.tsx  (or wherever your HomePage lives)
import { books as allBooks } from "./data/books";
import HomeHeroAndBooks from "@/components/HomeHeroAndBooks";
import HomeInfoAndComingSoon from "@/components/HomeInfoAndComingSoon";

export default function HomePage() {
  const books = allBooks.filter((b) => b.status === "published");
  const comingSoon = allBooks.filter((b) => b.status === "coming-soon");

  return (
    <>
      {/* PAGE WRAPPER */}
      <section className="relative py-8 sm:py-10">
        <HomeHeroAndBooks books={books} />
        <HomeInfoAndComingSoon comingSoon={comingSoon} />
      </section>
    </>
  );
}
