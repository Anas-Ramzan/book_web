"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const links = [
  { href: "/", label: "Home" },
  { href: "#book", label: "Book" },
  { href: "#coming-soon", label: "Coming soon" },
  { href: "#about", label: "About" },
  { href: "#contact", label: "Contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const handleNavClick = (href: string) => {
    // Close mobile menu
    setOpen(false);

    if (href.startsWith("#")) {
      if (pathname === "/") {
        // On homepage -> smooth scroll
        const element = document.querySelector(href);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      } else {
        // On another page -> go to homepage with hash
        router.push("/" + href);
      }
    } else {
      router.push(href);
    }
  };

  return (
    <nav className="sticky top-0 z-50 bg-surface/80 backdrop-blur border-b border-black/5">
      <div className="container flex h-[60px] items-center justify-between">
        {/* Brand */}
        <Link href="/" className="text-lg font-semibold text-[#225685]">
          Rachel Rain Martin
        </Link>

        {/* Desktop menu */}
        <div className="hidden md:flex items-center gap-3 lg:gap-6">
          {links.map((l) => {
            const active = pathname === l.href;
            return (
              <button
                key={l.href}
                onClick={() => handleNavClick(l.href)}
                className={[
                  "inline-flex h-[34px] items-center justify-center rounded-[12px] px-[14px] lg:px-[20px]",
                  "text-white text-[14px] lg:text-[16px]",
                  active ? "bg-[#225685]" : "bg-[#225685] hover:brightness-110",
                  "shadow-sm transition-transform duration-200 hover:-translate-y-0.5",
                ].join(" ")}
              >
                {l.label}
              </button>
            );
          })}
        </div>

        {/* Hamburger (mobile) */}
        <button
          aria-label="Open menu"
          className="md:hidden inline-flex h-10 w-10 items-center justify-center rounded-md text-[#225685] hover:bg-black/5"
          onClick={() => setOpen((s) => !s)}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile panel */}
      {open && (
        <div className="md:hidden border-t border-black/5 bg-white/95 backdrop-blur">
          <div className="container py-4 flex flex-col gap-2">
            {links.map((l) => (
              <button
                key={l.href}
                onClick={() => handleNavClick(l.href)}
                className={[
                  "w-full rounded-md px-4 py-3 text-sm text-left",
                  pathname === l.href
                    ? "bg-[#225685] text-white"
                    : "hover:bg-surface",
                ].join(" ")}
              >
                {l.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
