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
  id: string;
  slug: string;
  name: string;
  cover_image: string | null;
  author: string;
  amazon_link: string;
  coming_soon: boolean | null;
};

export default function HomeHeroAndBooks({ books }: { books: BookCard[] }) {
  return (
    <>
      {/* Author Name */}
      <h1
        className={`${laBelle.variable} text-center text-[34px] sm:text-[44px] md:text-[56px] leading-[1.05] animate-fade-in`}
        style={{ fontFamily: "var(--font-la-belle)" }}
      >
        Rachel Rain Martin
      </h1>

      {/* Hero Image */}
      <div className="container mt-6 sm:mt-8 animate-fade-in-up">
        <div className="overflow-hidden rounded-[10px]">
          <Image
            src="/hero.png"
            alt="Rachel Rain Martin Book"
            width={1334}
            height={496}
            className="w-full h-[220px] sm:h-[320px] md:h-[400px] lg:h-[450px] object-cover transition-transform duration-500 hover:scale-[1.02]"
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
      <div className="mx-auto mt-10 w-full max-w-[1200px] px-4 sm:px-6" id="book">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-5 md:gap-6">
          {books.map((b, index) => (
            <Link
              key={b.id}
              href={`/book/${b.slug}`}
              className="group relative w-full aspect-[220/309] overflow-hidden rounded-lg shadow-md transition-all duration-300 hover:scale-105 hover:shadow-xl animate-fade-in-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {b.cover_image ? (
                <Image
                  src={b.cover_image}
                  alt={b.name}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-110"
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                />
              ) : (
                <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                  <span className="text-gray-400 text-sm">No Cover</span>
                </div>
              )}
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
