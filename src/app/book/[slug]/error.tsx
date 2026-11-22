"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { startTransition } from "react";

export default function BookError({ reset }: { reset: () => void }) {
  const router = useRouter();

  return (
    <section className="container mx-auto px-4 py-12 text-center min-h-[60vh]">
      <h1 className="text-2xl font-semibold text-gray-900">Unable to load book details</h1>
      <p role="alert" className="mt-4 text-gray-600">Please try again in a moment.</p>
      <button
        onClick={() => startTransition(() => {
          router.refresh();
          reset();
        })}
        className="mt-6 rounded-md bg-[#225685] px-6 py-3 text-white hover:bg-[#1b466d]"
      >
        Try again
      </button>
      <Link href="/" className="mt-6 ml-6 inline-block text-[#225685] hover:underline">
        Back to Books
      </Link>
    </section>
  );
}
