import Image from "next/image";
import { La_Belle_Aurore } from "next/font/google";

const laBelle = La_Belle_Aurore({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-la-belle",
});

export default function HomePage() {
  const books = ["/img1.png", "/img2.png", "/img3.png", "/img4.png", "/img5.png"];
  const comingSoon = ["/cm1.png", "/cm2.png", "/cm3.png"]; // your new 3 books

  return (
    <>
      {/* MASTER WRAPPER */}
      <section className="relative py-10">
        {/* Author Name */}
        <h1
          className={`${laBelle.variable} text-center text-[56px] leading-[100%] relative z-10`}
          style={{ fontFamily: "var(--font-la-belle)" }}
        >
          Rachel Rain Martin
        </h1>

        {/* Hero Image */}
        <div className="relative z-10 mx-auto mt-8 w-full max-w-[1200px] overflow-hidden rounded-[10px]">
          <Image
            src="/hero.png"
            alt="Rachel Rain Martin Book"
            width={1334}
            height={496}
            className="w-full h-[450px] object-cover"
            priority
          />
        </div>

        {/* Book Covers */}
        <div className="relative z-10 mx-auto mt-10 w-full max-w-[1200px] flex flex-wrap justify-center gap-6">
          {books.map((src, index) => (
            <div
              key={index}
              className="relative w-[220px] h-[309px] overflow-hidden rounded-lg shadow-md hover:scale-105 transition-transform duration-300"
            >
              <Image src={src} alt={`Book ${index + 1}`} fill className="object-cover" />
            </div>
          ))}
        </div>

        {/* About + Subscribe */}
        <section className="relative z-10 mx-auto mt-16 max-w-[1200px] bg-white rounded-[10px] overflow-hidden">
          <div className="grid gap-10 md:grid-cols-2 p-8 md:p-12 items-start md:items-center">
            {/* LEFT — author info */}
            <div>
              <h2
                className={`${laBelle.variable} text-[48px] mb-4`}
                style={{ fontFamily: "var(--font-la-belle)" }}
              >
                Rachel Rain Martin
              </h2>
              <p className="text-[22px] leading-[1.6] text-gray-900">
                Rachel Rain Martin is a multi-genre author, poet, and lyricist
                that enjoys spending her free time researching genealogy, reading,
                and learning new things.
              </p>
            </div>

            {/* RIGHT — subscribe */}
            <div className="w-full flex flex-col items-center text-center">
              <h3 className="text-[26px] font-semibold text-gray-900 leading-tight">
                Want to hear more from
              </h3>
              <p
                className={`${laBelle.variable} text-[22px] mb-3 leading-tight`}
                style={{ fontFamily: "var(--font-la-belle)" }}
              >
                Rachel Rain Martin?
              </p>
              <p className="text-gray-700 mb-4 max-w-[720px]">
                Sign up with your email address to receive news, updates, and exclusive content.
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
        {/* === Coming Soon Section (Figma-accurate individual widths) === */}
<section className="relative z-10 mx-auto mt-12 mb-10 w-full max-w-[1200px] text-center">
  <h2 className="text-[30px] font-semibold text-[#18436a] mb-8">
    Coming soon
  </h2>

  <div className="flex flex-wrap justify-center items-start gap-8">
    {/* LEFT IMAGE */}
    <div
      className="relative w-[260px] h-[390px] overflow-hidden rounded-lg shadow-md hover:scale-105 transition-transform duration-300 bg-white"
    >
      <Image
        src="/cm1.png"
        alt="Coming Soon 1"
        fill
        className="object-cover"
        sizes="260px"
      />
    </div>

    {/* CENTER IMAGE (wider) */}
    <div
      className="relative w-[589px] h-[390px] overflow-hidden rounded-lg shadow-md hover:scale-105 transition-transform duration-300 bg-white"
    >
      <Image
        src="/cm2.png"
        alt="Coming Soon 2"
        fill
        className="object-cover"
        sizes="500px"
      />
    </div>

    {/* RIGHT IMAGE */}
    <div
      className="relative w-[260px] h-[390px] overflow-hidden rounded-lg shadow-md hover:scale-105 transition-transform duration-300 bg-white"
    >
      <Image
        src="/cm3.png"
        alt="Coming Soon 3"
        fill
        className="object-cover"
        sizes="260px"
      />
    </div>
  </div>
</section>




      </section>
    </>
  );
}
