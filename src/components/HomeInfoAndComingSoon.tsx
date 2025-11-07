// src/components/HomeInfoAndComingSoon.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { La_Belle_Aurore } from "next/font/google";

const laBelle = La_Belle_Aurore({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-la-belle",
});

export type ComingSoonBook = {
  id: string;
  slug: string;
  name: string;
  cover_image: string | null;
  author: string;
  amazon_link: string;
  coming_soon: boolean | null;
};

export default function HomeInfoAndComingSoon({
  comingSoon,
}: {
  comingSoon: ComingSoonBook[];
}) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!email || !email.includes("@")) {
      setStatus("error");
      setMessage("Please enter a valid email address");
      return;
    }

    setStatus("loading");
    setMessage("");

    try {
      const response = await fetch("/api/subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus("success");
        setMessage("Thank you for subscribing! You'll receive updates soon.");
        setEmail("");
        // Reset success message after 5 seconds
        setTimeout(() => {
          setStatus("idle");
          setMessage("");
        }, 5000);
      } else {
        setStatus("error");
        setMessage(data.error || "Something went wrong. Please try again.");
      }
    } catch {
      setStatus("error");
      setMessage("Network error. Please check your connection and try again.");
    }
  };

  return (
    <>
      {/* About + Subscribe */}
      <section className="container mt-12 sm:mt-16 animate-fade-in-up" id="about">
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

            <form onSubmit={handleSubmit} className="w-full max-w-[560px]">
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  disabled={status === "loading"}
                  className={`w-full rounded-md bg-[#dbe4ee] px-4 py-3 text-gray-900 placeholder:text-gray-600 outline-none focus:ring-2 transition-all ${
                    status === "error"
                      ? "focus:ring-red-500 border-2 border-red-300"
                      : status === "success"
                      ? "focus:ring-green-500 border-2 border-green-300"
                      : "focus:ring-[#225685]/40"
                  } disabled:opacity-50 disabled:cursor-not-allowed`}
                  required
                />
              </div>
              
              {/* Status Message */}
              {message && (
                <div
                  className={`mt-3 px-4 py-2 rounded-md text-sm font-medium ${
                    status === "success"
                      ? "bg-green-50 text-green-800 border border-green-200"
                      : "bg-red-50 text-red-800 border border-red-200"
                  }`}
                >
                  {message}
                </div>
              )}

              <button
                type="submit"
                disabled={status === "loading" || status === "success"}
                className="mt-4 mx-auto inline-flex items-center justify-center gap-2 rounded-md bg-[#225685] px-6 py-3 text-white hover:bg-[#1b466d] transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 min-w-[140px]"
              >
                {status === "loading" ? (
                  <>
                    <svg
                      className="animate-spin h-4 w-4"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    <span>Subscribing...</span>
                  </>
                ) : status === "success" ? (
                  <>
                    <svg
                      className="h-4 w-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span>Subscribed!</span>
                  </>
                ) : (
                  "Subscribe"
                )}
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Coming Soon */}
      {comingSoon.length > 0 && (
        <section className="container mt-12 sm:mt-14 mb-10 text-center animate-fade-in-up" id="coming-soon">
          <h2 className="text-[24px] sm:text-[28px] md:text-[30px] font-semibold text-[#18436a] mb-6 sm:mb-8">
            Coming soon
          </h2>

          <div className="flex flex-col lg:flex-row justify-center items-center lg:items-start gap-6 sm:gap-8">
            {comingSoon.map((b, idx) => (
              <Link
                key={b.id}
                href={`/book/${b.slug}`}
                className={[
                  "group relative overflow-hidden rounded-lg shadow-md bg-white transition-all duration-300 hover:scale-105 hover:shadow-xl",
                  idx === 1
                    ? "w-full max-w-[700px] h-[220px] sm:h-[280px] lg:w-[589px] lg:h-[390px]"
                    : "w-full max-w-[460px] h-[260px] sm:h-[320px] lg:w-[260px] lg:h-[390px]",
                ].join(" ")}
                style={{ animationDelay: `${idx * 150}ms` }}
              >
                {b.cover_image ? (
                  <Image
                    src={b.cover_image}
                    alt={b.name}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-110"
                    sizes="(max-width: 1024px) 100vw, (max-width: 1280px) 50vw, 33vw"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                    <span className="text-gray-400 text-sm">No Cover</span>
                  </div>
                )}
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Second Header Image */}
      <div className="container mt-10 sm:mt-12 animate-fade-in-up">
        <div className="overflow-hidden rounded-[10px]">
          <Image
            src="/header2.png"
            alt="Rachel Rain Martin Book Header 2"
            width={1334}
            height={496}
            className="w-full h-[220px] sm:h-[320px] md:h-[400px] lg:h-[450px] object-cover transition-transform duration-500 hover:scale-[1.02]"
            priority
          />
        </div>
      </div>
    </>
  );
}
