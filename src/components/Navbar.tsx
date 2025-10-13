"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/", label: "Home" },
  { href: "/book", label: "Book" },
  { href: "/coming-soon", label: "Coming soon" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  return (
    <nav className="sticky top-0 z-50 border-b bg-[--color-surface]/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-center gap-6 px-4 py-4">
        {links.map((l) => {
          const active = pathname === l.href;
          return (
            <Link
              key={l.href}
              href={l.href}
              className={[
                "rounded-[--radius-pill] px-8 py-3 text-xl font-medium shadow transition",
                "hover:-translate-y-0.5 hover:shadow-md",
                active
                  ? "bg-primary-800 text-white"
                  : "bg-primary-700 hover:bg-primary-800 text-white",
              ].join(" ")}
            >
              {l.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
