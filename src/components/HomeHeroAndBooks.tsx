// src/components/HomeHeroAndBooks.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { La_Belle_Aurore } from "next/font/google";

const laBelle = La_Belle_Aurore({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-la-belle",
});

export type BookCard = {
  slug: string;
  title: string;
  cover: string;
  status: "published" | "coming-soon" | string;
};

export default function HomeHeroAndBooks({ books }: { books: BookCard[] }) {
  return (
    <>
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
      <Image
        src={"/Vector 11.png"}
        width={20}
        height={20}
        alt=""
        className="w-full absolute -z-1 right-0 -top-20"
        unoptimized
      />

      {/* Book Grid */}
      <div className="mx-auto mt-10 w-full max-w-[1200px] px-0" id="book">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-5">
          {books.map((b) => (
            <Link
              key={b.slug}
              href={`/book/${b.slug}`}
              className="relative w-full aspect-[220/309] overflow-hidden rounded-lg shadow-md transition-transform duration-300 hover:scale-105"
            >
              <Image src={b.cover} alt={b.title} fill className="object-cover" />
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
