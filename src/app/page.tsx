import HomeHeroAndBooks from "@/components/HomeHeroAndBooks";
import HomeInfoAndComingSoon from "@/components/HomeInfoAndComingSoon";
import { createClient } from "@/utils/supabase/server";

export const revalidate = 60; // optional: revalidate every 60s (SSG + ISR)

// ✅ Define TypeScript type matching Supabase schema
interface Book {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  author: string;
  cover_image: string | null;
  amazon_link: string;
  coming_soon: boolean | null;
  click_count: number | null;
  created_at: string | null;
}

export default async function HomePage() {
  // ✅ Server-side fetching using Supabase
  const supabase = createClient();

  const { data: booksData, error } = await supabase
    .from("books")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Supabase fetch error:", error.message);
    return (
      <div className="flex items-center justify-center min-h-[60vh] text-red-500">
        Failed to load books.
      </div>
    );
  }

  const books: Book[] = booksData || [];

  // Filter books: published = coming_soon is false or null, coming soon = coming_soon is true
  const publishedBooks = books.filter((b) => !b.coming_soon);
  const comingSoon = books.filter((b) => b.coming_soon === true);

  return (
    <section className="relative py-8 sm:py-10">
      <HomeHeroAndBooks books={publishedBooks} />
      <HomeInfoAndComingSoon comingSoon={comingSoon} />
    </section>
  );
}
