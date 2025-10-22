import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { books } from "@/app/data/books";
import { La_Belle_Aurore, Inter } from "next/font/google";

const laBelle = La_Belle_Aurore({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-la-belle",
});

const inter = Inter({
  weight: ["400", "500", "600"],
  subsets: ["latin"],
  variable: "--font-inter",
});

function Star({ filled }: { filled: boolean }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-[18px] w-[18px]"
      fill={filled ? "#facc15" : "none"}
      stroke="#facc15"
      strokeWidth="1.5"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M11.48 3.5c.2-.5.84-.5 1.04 0l1.77 4.43c.1.26.34.44.62.48l4.78.68c.53.07.74.74.36 1.11l-3.46 3.36c-.2.2-.29.48-.24.76l.82 4.74c.09.53-.47.94-.95.69l-4.29-2.26a.83.83 0 0 0-.79 0l-4.29 2.26c-.48.25-1.04-.16-.95-.69l.82-4.74c.05-.28-.05-.56-.24-.76L3.94 10.2a.73.73 0 0 1 .36-1.11l4.78-.68c.28-.04.52-.22.62-.48l1.77-4.43Z"
      />
    </svg>
  );
}

export function generateStaticParams() {
  return books.map((b) => ({ slug: b.slug }));
}

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

  const rating = typeof book.rating === "number" ? Math.max(0, Math.min(5, book.rating)) : 0;
  const fullStars = Math.round(rating);

  // Temporary descriptions (replace with admin data later)
  const mockDescriptions: Record<string, string> = {
    "A Magical Day":
      `In "A Magical Day" by Rachel Rain Martin, a young girl is captivated by the sea's mysteries. As she sits by the shore's edge, a low tide reveals a hidden treasure—a magical door. Intrigued by the ocean's whispers, she musters the courage to open it and finds herself in a wondrous world teeming with sea creatures and endless wonder. Through shimmering light and gentle rhythm, this tale celebrates courage, imagination, and the beauty of discovery.`,
    "On the Bluffs of Cane Creek":
      `Set against the haunting beauty of the countryside, "On the Bluffs of Cane Creek" follows a young woman’s search for truth and belonging. When echoes of the past resurface, she discovers courage hidden within her heart. Rachel Rain Martin weaves an emotional story of memory, loss, and redemption—reminding us that love and forgiveness often bloom where pain once grew.`,
    "Ashes of Richmond":
      `"Ashes of Richmond" unfolds in a world scarred by war yet alive with hope. Through broken cities and fragile dreams, characters strive to rebuild not only their homes but their hearts. Rachel Rain Martin paints an unforgettable picture of survival, courage, and human resilience, showing that healing is born from the ashes of our deepest wounds.`,
    "Whispers of Willow Creek":
      `Whispers drift through time in "Whispers of Willow Creek," where hidden letters uncover stories of love and sorrow that span generations. Rachel Rain Martin captures the gentle balance between remembering and moving on, crafting a story that feels like memory itself—soft, nostalgic, and achingly beautiful.`,
  };

  const description =
    mockDescriptions[book.title] ||
    `In “${book.title},” Rachel Rain Martin explores emotion, connection, and the quiet power of change. This evocative story blends tenderness with introspection, guiding readers through landscapes of heart and mind that stay with them forever. and the quiet power of change. This evocative story blends tenderness with introspection, `;

  return (
    // 👇 Entire page uses Inter font
    <section className={`${inter.variable} use-inter relative py-8 sm:py-10`}>
      {/* Author Signature */}
      <h1
        className={`${laBelle.variable} text-center text-[40px] sm:text-[52px] leading-[1.1] mb-6`}
        style={{ fontFamily: "var(--font-la-belle)" }}
      >
        Rachel Rain Martin
      </h1>

      {/* Main Layout */}
      <div className="container mx-auto px-4 sm:px-6 md:px-8">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-10">
          {/* LEFT: Book Cover */}
          <div className="shrink-0">
            <Image
              src={book.cover}
              alt={book.title}
              width={400}
              height={400}
              className="rounded-md shadow-md object-cover"
              priority
            />
          </div>

          {/* RIGHT: Info */}
          <div className="flex-1 text-gray-900">
            <div className="text-[24px] font-semibold tracking-tight mb-1">
              {book.title}
              {book.releaseDate && (
                <span className="ml-2 font-normal text-gray-700">
                  Paperback – {book.releaseDate}
                </span>
              )}
            </div>

            <div className="text-[16px] text-gray-800 mb-3">
              by <span className="font-medium">{book.authors.join(", ")}</span>
            </div>

            <hr className="border-gray-300 mb-3" />

            {/* Rating */}
            <div className="flex items-center gap-2 text-[16px] mb-3">
              <span className="font-medium">Rating:</span>
              <span>{rating.toFixed(1)}</span>
              <div className="flex items-center">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} filled={i < fullStars} />
                ))}
              </div>
            </div>

            <hr className="border-gray-300 mb-4" />

            {/* Description */}
            <p className="text-[17px] leading-[1.9] text-gray-900 max-w-[700px]">
              {description}
            </p>

            {/* CTA */}
            {book.buyLink && book.buyLink.trim() !== "" && (
              <div className="mt-6">
                <Link
                  href={book.buyLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex rounded-full px-8 py-3 text-[15px] font-medium
                             bg-gradient-to-b from-[#E9ECFF] to-[#C9D2FF] text-[#2a2a2a]
                             shadow-md hover:opacity-95 transition"
                >
                  Shop now
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Product Details */}
      <div className="mt-12 container mx-auto px-4 sm:px-6 md:px-8">
        <div className="text-left text-[20px] sm:text-[22px] font-semibold text-[#1c3b60] mb-6">
          Product details
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
          <div>
            <div className="text-sm text-gray-600">Reading age</div>
            <div className="text-[15px] font-medium mt-1">{book.readingAge ?? "—"}</div>
          </div>
          <div>
            <div className="text-sm text-gray-600">Language</div>
            <div className="text-[15px] font-medium mt-1">{book.language ?? "—"}</div>
          </div>
          <div>
            <div className="text-sm text-gray-600">Print length</div>
            <div className="text-[15px] font-medium mt-1">
              {book.pages ? `${book.pages} pages` : "—"}
            </div>
          </div>
          <div>
            <div className="text-sm text-gray-600">Dimensions</div>
            <div className="text-[15px] font-medium mt-1">{book.dims ?? "—"}</div>
          </div>
        </div>
      </div>
    </section>
  );
}
