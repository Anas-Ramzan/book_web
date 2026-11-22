import Link from "next/link";

export default function BookNotFound() {
  return (
    <section className="container mx-auto px-4 py-12 text-center min-h-[60vh]">
      <h1 className="text-2xl font-semibold text-gray-900">Book not found</h1>
      <p className="mt-4 text-gray-600">The book you are looking for is unavailable.</p>
      <Link href="/" className="mt-6 inline-block text-[#225685] hover:underline">
        Back to Books
      </Link>
    </section>
  );
}
