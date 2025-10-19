import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { books, getBook } from "@/app/data/books";

type Props = { params: { slug: string } };

export function generateStaticParams() {
  return books.map(b => ({ slug: b.slug })); // SSG for all
}

export async function generateMetadata({ params }: Props) {
  const b = getBook(params.slug);
  if (!b) return {};
  return {
    title: `${b.title} • Rachel Rain Martin`,
    description: b.blurb?.slice(0, 150),
    openGraph: { title: b.title, description: b.blurb?.slice(0, 200), images: [{ url: b.cover }] },
  };
}

export default function BookPage({ params }: Props) {
  const b = getBook(params.slug);
  if (!b) notFound();

  return (
    <section className="relative py-8 sm:py-10">
      <h1 className="text-center text-[34px] sm:text-[44px] leading-[1.1] font-serif">
        Rachel Rain Martin
      </h1>

      {/* main grid */}
      <div className="container mt-6 grid gap-6 md:grid-cols-[320px,1fr]">
        {/* LEFT: cover */}
        <div className="flex flex-col items-center">
          <div className="relative w-[280px] aspect-[220/309] rounded-lg overflow-hidden shadow">
            <Image src={b.cover} alt={b.title} fill className="object-cover" />
          </div>

          {/* Buy button (Amazon type) */}
          {b.buyLink && (
            <Link
              href={b.buyLink}
              target="_blank" rel="noopener noreferrer"
              className="mt-5 rounded-full px-6 py-3 text-sm font-medium bg-gradient-to-b from-[#cfd7ff] to-[#bcc7ff] text-[#2c2c2c] shadow-md hover:opacity-90"
            >
              Shop now
            </Link>
          )}
        </div>

        {/* RIGHT: info */}
        <div>
          <div className="text-lg font-semibold">{b.title}</div>
          <div className="text-sm text-gray-700 mt-1">
            {b.releaseDate && <>Paperback — {b.releaseDate} • </>}
            by {b.authors.join(", ")}
          </div>

          {b.rating && (
            <div className="mt-2 text-sm">
              Rating: {b.rating.toFixed(1)} ★★★★★{/* replace with stars UI later if you want */}
            </div>
          )}

          <hr className="my-3" />

          <p className="text-[15px] sm:text-[16px] leading-7 text-gray-900 whitespace-pre-line">
            {b.blurb}
          </p>

          {/* product details tiles */}
          <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm">
            {b.readingAge && (
              <div className="rounded-lg bg-[#f1f4f9] p-4">
                <div className="font-semibold">Reading age</div>
                <div>{b.readingAge}</div>
              </div>
            )}
            {b.language && (
              <div className="rounded-lg bg-[#f1f4f9] p-4">
                <div className="font-semibold">Language</div>
                <div>{b.language}</div>
              </div>
            )}
            {b.pages && (
              <div className="rounded-lg bg-[#f1f4f9] p-4">
                <div className="font-semibold">Print length</div>
                <div>{b.pages} pages</div>
              </div>
            )}
            {b.dims && (
              <div className="rounded-lg bg-[#f1f4f9] p-4">
                <div className="font-semibold">Dimensions</div>
                <div>{b.dims}</div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Optional hero below/above */}
      {b.hero && (
        <div className="container mt-10">
          <div className="overflow-hidden rounded-[10px]">
            <Image src={b.hero} alt={b.title} width={1334} height={496}
                   className="w-full h-[220px] sm:h-[320px] md:h-[400px] object-cover" />
          </div>
        </div>
      )}
    </section>
  );
}
