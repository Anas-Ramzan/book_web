import Image from "next/image";
import { La_Belle_Aurore } from "next/font/google";
import Link from "next/link";
import { books as allBooks } from "./data/books";

const laBelle = La_Belle_Aurore({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-la-belle",
});

export default function HomePage() {
  const books = allBooks.filter((b) => b.status === "published");
  const comingSoon = allBooks.filter((b) => b.status === "coming-soon");

  return (
    <>
      {/* PAGE WRAPPER */}
      <section className="relative py-8 sm:py-10">
        {/* Author Name */}
        <h1
          className={`${laBelle.variable} text-center text-[34px] sm:text-[44px] md:text-[56px] leading-[1.05]`}
          style={{ fontFamily: "var(--font-la-belle)" }}
        >
          Rachel Rain Martin
        </h1>

        {/* Hero Image */}
        <div className="container mt-6 sm:mt-8">
          <div className="overflow-hidden rounded-[10px]">
            <Image
              src="/hero.png"
              alt="Rachel Rain Martin Book"
              width={1334}
              height={496}
              className="w-full h-[220px] sm:h-[320px] md:h-[400px] lg:h-[450px] object-cover"
              priority
            />
          </div>
        </div>
        <Image src={'/Vector 11.png'} width={20} height={20} alt="" className="w-full absolute -z-1 right-0 -top-20" unoptimized />

        <div className="mx-auto mt-10 w-full max-w-[1200px] px-0" id="book">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-5">
            {books.map((b) => (
              <Link
                key={b.slug}
                href={`/book/${b.slug}`}
                className="relative w-full aspect-[220/309] overflow-hidden rounded-lg shadow-md transition-transform duration-300 hover:scale-105"
              >
                <Image
                  src={b.cover}
                  alt={b.title}
                  fill
                  className="object-cover"
                />
              </Link>
            ))}
          </div>
        </div>

        {/* About + Subscribe */}
        <section className="container mt-12 sm:mt-16" id="about">
          <div className="rounded-[10px] bg-white p-5 sm:p-8 md:p-10 grid gap-8 md:grid-cols-2 items-start md:items-center">
            {/* LEFT — author info */}
            <div>
              <h2
                className={`${laBelle.variable} text-[34px] sm:text-[42px] md:text-[48px] mb-3 sm:mb-4`}
                style={{ fontFamily: "var(--font-la-belle)" }}
              >
                Rachel Rain Martin
              </h2>
              <p className="text-[16px] sm:text-[18px] md:text-[22px] leading-[1.6] text-gray-900">
                Rachel Rain Martin is a multi-genre author, poet, and lyricist
                that enjoys spending her free time researching genealogy,
                reading, and learning new things.
              </p>
            </div>

            {/* RIGHT — subscribe */}
            <div className="w-full flex flex-col items-center text-center">
              <h3 className="text-[20px] sm:text-[22px] md:text-[26px] font-semibold text-gray-900 leading-tight">
                Want to hear more from
              </h3>
              <p
                className={`${laBelle.variable} text-[18px] sm:text-[20px] md:text-[22px] mt-1 mb-3 leading-tight`}
                style={{ fontFamily: "var(--font-la-belle)" }}
              >
                Rachel Rain Martin?
              </p>
              <p className="text-gray-700 mb-4 max-w-[720px] text-[14px] sm:text-[16px]">
                Sign up with your email address to receive news, updates, and
                exclusive content.
              </p>

              <form className="w-full max-w-[560px]">
                <input
                  type="email"
                  placeholder="Email"
                  className="w-full rounded-md bg-[#dbe4ee] px-4 py-3 text-gray-900 placeholder:text-gray-600 outline-none focus:ring-2 focus:ring-[#225685]/40"
                />
                <button
                  type="submit"
                  className="mt-4 mx-auto inline-flex rounded-md bg-[#225685] px-6 py-3 text-white hover:bg-[#1b466d] transition-colors"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>
        </section>

        {/* Coming Soon — desktop widths match Figma; mobile stacks */}
        <section className="container mt-12 sm:mt-14 mb-10 text-center" id="coming-soon">
          <h2 className="text-[24px] sm:text-[28px] md:text-[30px] font-semibold text-[#18436a] mb-6 sm:mb-8">
            Coming soon
          </h2>

          <div className="flex flex-col lg:flex-row justify-center items-center lg:items-start gap-6 sm:gap-8">
            {comingSoon.map((b, idx) => (
              <Link
                key={b.slug}
                href={`/book/${b.slug}`}
                className={[
                  "relative overflow-hidden rounded-lg shadow-md bg-white transition-transform hover:scale-105",
                  idx === 1
                    ? "w-full max-w-[700px] h-[220px] sm:h-[280px] lg:w-[589px] lg:h-[390px]"
                    : "w-full max-w-[460px] h-[260px] sm:h-[320px] lg:w-[260px] lg:h-[390px]",
                ].join(" ")}
              >
                <Image
                  src={b.cover}
                  alt={b.title}
                  fill
                  className="object-cover"
                />
              </Link>
            ))}
          </div>
        </section>

        {/* Second Header Image */}
        <div className="container mt-10 sm:mt-12">
          <div className="overflow-hidden rounded-[10px]">
            <Image
              src="/header2.png"
              alt="Rachel Rain Martin Book Header 2"
              width={1334}
              height={496}
              className="w-full h-[220px] sm:h-[320px] md:h-[400px] lg:h-[450px] object-cover"
              priority
            />
          </div>
        </div>
      </section>
    </>
  );
}
