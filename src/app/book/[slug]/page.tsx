// src/app/book/[slug]/page.tsx
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { books } from "@/app/data/books";
import { La_Belle_Aurore } from "next/font/google";

const laBelle = La_Belle_Aurore({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-la-belle",
});

// Pre-render all book pages (SSG)
export function generateStaticParams() {
  return books.map((b) => ({ slug: b.slug }));
}

// (optional) SEO
export async function generateMetadata({ params }: { params: { slug: string } }) {
  const book = books.find((b) => b.slug === params.slug);
  if (!book) return {};
  return {
    title: `${book.title} • Rachel Rain Martin`,
    description: book.blurb?.slice(0, 150),
    openGraph: {
      title: book.title,
      description: book.blurb?.slice(0, 200),
      images: [{ url: book.cover }],
    },
  };
}

export default function BookPage({ params }: { params: { slug: string } }) {
  const book = books.find((b) => b.slug === params.slug);
  if (!book) notFound();

  return (
    <section className="relative py-8 sm:py-10">
      {/* Top Name to match your style */}
      <h1
        className={`${laBelle.variable} text-center text-[34px] sm:text-[44px] leading-[1.1]`}
        style={{ fontFamily: "var(--font-la-belle)" }}
      >
        Rachel Rain Martin
      </h1>

      {/* Optional top banner */}
      {book.hero && (
        <div className="container mt-6">
          <div className="overflow-hidden rounded-[10px]">
            <Image
              src={book.hero}
              alt={book.title}
              width={1334}
              height={496}
              className="w-full h-[200px] sm:h-[320px] md:h-[380px] lg:h-[420px] object-cover"
              priority
            />
          </div>
        </div>
      )}

      {/* Main grid: cover + details */}
      <div className="container mt-8 grid gap-8 md:grid-cols-[320px,1fr]">
        {/* LEFT: cover + Buy button */}
        <div className="flex flex-col items-center">
          <div className="relative w-[280px] aspect-[220/309] overflow-hidden rounded-lg shadow-md">
            <Image src={book.cover} alt={book.title} fill className="object-cover" />
          </div>

          {/* Amazon-type button (shows only if buyLink exists & not empty) */}
          {book.buyLink && book.buyLink.trim().length > 0 && (
            <Link
              href={book.buyLink}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex rounded-full px-6 py-3 text-sm font-medium bg-gradient-to-b from-[#d9e0ff] to-[#bcc7ff] text-[#1f2937] shadow hover:opacity-90"
            >
              Shop now
            </Link>
          )}
        </div>

        {/* RIGHT: textual info */}
        <div>
          <div className="text-xl sm:text-2xl font-semibold">{book.title}</div>
          <div className="text-sm text-gray-700 mt-1">
            {book.releaseDate && <>Paperback — {book.releaseDate} • </>}
            by {book.authors.join(", ")}
          </div>

          {typeof book.rating === "number" && (
            <div className="mt-2 text-sm text-gray-800">
              Rating: {book.rating.toFixed(1)} ★★★★★
            </div>
          )}

          <hr className="my-4" />

          <p className="text-[15px] sm:text-[16px] leading-7 text-gray-900 whitespace-pre-line">
            {book.blurb}
          </p>

          {/* Product details tiles */}
          <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm">
            {book.readingAge && (
              <div className="rounded-lg bg-[#f1f4f9] p-4">
                <div className="font-semibold">Reading age</div>
                <div>{book.readingAge}</div>
              </div>
            )}
            {book.language && (
              <div className="rounded-lg bg-[#f1f4f9] p-4">
                <div className="font-semibold">Language</div>
                <div>{book.language}</div>
              </div>
            )}
            {book.pages && (
              <div className="rounded-lg bg-[#f1f4f9] p-4">
                <div className="font-semibold">Print length</div>
                <div>{book.pages} pages</div>
              </div>
            )}
            {book.dims && (
              <div className="rounded-lg bg-[#f1f4f9] p-4">
                <div className="font-semibold">Dimensions</div>
                <div>{book.dims}</div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
