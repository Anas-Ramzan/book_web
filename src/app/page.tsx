export default function HomePage() {
  return (
    <section className="py-12">
      <h1 className="text-center text-4xl font-bold tracking-tight">
        Rachel Rain Martin
      </h1>

      <p className="mx-auto mt-4 max-w-2xl text-center text-lg text-gray-600">
        A clean landing page built with Next.js App Router and Tailwind CSS.
      </p>

      {/* hero image or content area */}
      <div className="mx-auto mt-10 aspect-[16/7] w-full max-w-5xl overflow-hidden rounded-xl bg-slate-200" />
    </section>
  );
}
