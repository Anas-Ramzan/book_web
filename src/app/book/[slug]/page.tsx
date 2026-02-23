import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import { La_Belle_Aurore, Inter } from "next/font/google";
import { ArrowLeft } from "lucide-react";

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


export async function generateMetadata({ params }: { params: { slug: string } }) {
  const supabase = createClient();
  const { data: book } = await supabase
    .from("books")
    .select("*")
    .eq("slug", params.slug)
    .single();

  if (!book) return {};
  return {
    title: `${book.name} • Rachel Rain Martin`,
    description: book.description?.slice(0, 150) || "",
    openGraph: {
      title: book.name,
      description: book.description?.slice(0, 200) || "",
      images: book.cover_image ? [{ url: book.cover_image }] : [],
    },
  };
}

export default async function BookPage({ params }: { params: { slug: string } }) {
  const supabase = createClient();
  const { data: book, error } = await supabase
    .from("books")
    .select("*")
    .eq("slug", params.slug)
    .single();

  if (error || !book) {
    notFound();
  }

  const description = book.description || `In "${book.name}," Rachel Rain Martin explores emotion, connection, and the quiet power of change. This evocative story blends tenderness with introspection, guiding readers through landscapes of heart and mind that stay with them forever.`;

  return (
    <section className={`${inter.variable} use-inter relative min-h-screen bg-gradient-to-b from-gray-50 to-white animate-fade-in`}>
      {/* Back Button */}
      <div className="container mx-auto px-4 sm:px-6 md:px-8 pt-6 sm:pt-8">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors duration-200 group mb-6"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-200" />
          <span className="text-sm font-medium">Back to Books</span>
        </Link>
      </div>

      {/* Hero Section with Book Cover */}
      <div className="container mx-auto px-4 sm:px-6 md:px-8 pb-12">
        <div className="max-w-6xl mx-auto">
          {/* Book Cover and Info Card */}
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-8 animate-fade-in-up">
            <div className="flex flex-col lg:flex-row">
              {/* Book Cover Section */}
              <div className="lg:w-2/5 p-6 sm:p-8 lg:p-12 bg-gradient-to-br from-gray-50 to-gray-100 flex items-start justify-center">
                {book.cover_image ? (
                  <div className="relative w-full max-w-[280px] sm:max-w-[320px] lg:max-w-[360px] mx-auto">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-200/20 to-purple-200/20 rounded-2xl blur-2xl transform rotate-6"></div>
                    <Image
                      src={book.cover_image}
                      alt={book.name}
                      width={400}
                      height={600}
                      className="relative rounded-xl shadow-2xl object-cover w-full transition-transform duration-500 hover:scale-105"
                      priority
                    />
                  </div>
                ) : (
                  <div className="w-full max-w-[280px] sm:max-w-[320px] lg:max-w-[360px] h-[420px] bg-gradient-to-br from-gray-200 to-gray-300 rounded-xl shadow-2xl flex items-center justify-center mx-auto">
                    <span className="text-gray-500 text-sm font-medium">No Cover Image</span>
                  </div>
                )}
              </div>

              {/* Book Info Section */}
              <div className="lg:w-3/5 p-6 sm:p-8 lg:p-12 flex flex-col justify-center">
                {/* Author Name */}
                <div className="mb-4">
                  <h2
                    className={`${laBelle.variable} text-[28px] sm:text-[32px] md:text-[36px] text-gray-800 mb-2`}
                    style={{ fontFamily: "var(--font-la-belle)" }}
                  >
                    Rachel Rain Martin
                  </h2>
                </div>

                {/* Book Title */}
                <h1 className="text-[32px] sm:text-[40px] md:text-[48px] font-bold text-gray-900 leading-tight mb-4">
                  {book.name}
                </h1>

                {/* Author */}
                <div className="flex items-center gap-2 mb-6">
                  <span className="text-gray-600 text-lg">by</span>
                  <span className="text-gray-900 text-lg font-semibold">{book.author}</span>
                </div>

                {/* Divider */}
                <div className="w-20 h-1 bg-gradient-to-r from-[#225685] to-[#C9D2FF] rounded-full mb-6"></div>

                {/* Description */}
                <div className="mb-8">
                  <p className="text-[16px] sm:text-[17px] md:text-[18px] leading-relaxed text-gray-700 max-w-2xl">
                    {description}
                  </p>
                </div>

                {/* CTA Button */}
                {book.amazon_link && book.amazon_link.trim() !== "" && (
                  <div className="mt-auto">
                    <Link
                      href={book.amazon_link}
                      target="_blank"
                      rel="noopener noreferrer"
                     
                    >
                      <div  className="group inline-flex items-center justify-center gap-3 rounded-full px-8 py-4 sm:px-10 sm:py-5 text-base sm:text-lg font-semibold
                                 bg-linear-to-r from-brand to-[#1b466d] text-white
                                 shadow-lg hover:shadow-xl transition-all duration-300 
                                 hover:scale-105 active:scale-95 hover:from-[#1b466d] hover:to-brand">
                        
                     
                      <span>Shop on Amazon</span>
                     
                     
                       <svg 
                        className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg> </div>
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Additional Info Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 animate-fade-in-up" style={{ animationDelay: '200ms' }}>
            {/* Book Details Card */}
            <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow duration-300">
              <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">Book Details</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Author</span>
                  <span className="text-gray-900 font-medium">{book.author}</span>
                </div>
                {book.created_at && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Published</span>
                    <span className="text-gray-900 font-medium">
                      {new Date(book.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long' })}
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Purchase Card */}
            {book.amazon_link && book.amazon_link.trim() !== "" && (
              <div className="bg-gradient-to-br from-[#E9ECFF] to-[#C9D2FF] rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow duration-300">
                <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wide mb-3">Available Now</h3>
                <p className="text-gray-800 text-sm mb-4">Get your copy from Amazon</p>
                <Link
                  href={book.amazon_link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-sm font-semibold text-[#225685] hover:text-[#1b466d] transition-colors"
                >
                  View on Amazon
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            )}

            {/* Coming Soon Badge */}
            {book.coming_soon && (
              <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl p-6 shadow-md border border-amber-200">
                <h3 className="text-sm font-semibold text-amber-800 uppercase tracking-wide mb-2">Status</h3>
                <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-amber-100 rounded-full">
                  <span className="w-2 h-2 bg-amber-500 rounded-full animate-pulse"></span>
                  <span className="text-sm font-semibold text-amber-800">Coming Soon</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
