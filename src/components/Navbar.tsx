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
    <nav className="sticky top-0 z-50 bg-surface/80 backdrop-blur">
      <div
        className="
          mx-auto flex w-[1200px] items-center justify-center
          gap-[55px] py-[13px]
        "
        style={{ height: "70px" }}
      >
        {links.map((l) => {
          const active = pathname === l.href;
          return (
            <Link
              key={l.href}
              href={l.href}
              className={[
                // Size & shape
                "inline-flex h-[32px] items-center justify-center rounded-[12px] px-[20px]",
                // Typography
                "text-white font-normal text-[22px] leading-none",
                // Colors
                active
                  ? "bg-brand"
                  : "bg-brand hover:brightness-110",
                // Motion
                "shadow-sm transition-transform duration-200 hover:-translate-y-0.5",
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
