import { Mail, Globe, Music } from "lucide-react";
import { FaFacebookF, FaYoutube } from "react-icons/fa";
import { Instrument_Sans } from "next/font/google";

const instrumentSans = Instrument_Sans({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-instrument",
});

export default function Footer() {
  return (
    <footer
      className={`${instrumentSans.variable} w-full bg-[#225685] text-white py-8 sm:py-9`}
      style={{ fontFamily: "var(--font-instrument)" }}
    >
      <div className="container flex flex-col items-center gap-6 sm:gap-8">
        {/* Heading */}
        <h2 className="text-center text-[20px] sm:text-[24px] font-normal leading-none tracking-wide">
          Contact Us
        </h2>

        {/* Links Row (wrap on small) */}
        <div className="flex flex-wrap justify-center items-center gap-x-4 gap-y-2 text-[12px] sm:text-[13px]">
          <a href="#" className="flex items-center gap-1 hover:underline underline-offset-4">
            <FaFacebookF size={13} /> Facebook@rachelrainmartin2013
          </a>
          <span className="hidden sm:inline">/</span>

          <a href="#" className="flex items-center gap-1 hover:underline underline-offset-4">
            <Music size={13} /> TikTok@rachelrainmartin
          </a>
          <span className="hidden sm:inline">/</span>

          <a href="#" className="flex items-center gap-1 hover:underline underline-offset-4">
            <FaYoutube size={13} /> YouTube@rachelrainmartin
          </a>
          <span className="hidden sm:inline">/</span>

          <a
            href="mailto:rachelrain@rachelrainmartin.com"
            className="flex items-center gap-1 hover:underline underline-offset-4"
          >
            <Mail size={13} /> Email: rachelrain@rachelrainmartin.com
          </a>
          <span className="hidden sm:inline">/</span>

          <a
            href="https://www.rachelrainmartin.com"
            className="flex items-center gap-1 hover:underline underline-offset-4"
          >
            <Globe size={13} /> Website: www.rachelrainmartin.com
          </a>
        </div>

        {/* Copyright */}
        <p className="text-center text-[11px] sm:text-[12px]">
          © 2025 Rachel Rain Martin / Privacy Policy / All Rights are Reserved
        </p>
      </div>
    </footer>
  );
}
