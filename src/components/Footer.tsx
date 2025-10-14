import { Mail, Globe, Music } from "lucide-react";
import { FaFacebookF, FaYoutube } from "react-icons/fa";
import { Instrument_Sans } from "next/font/google";

// Instrument Sans font only for footer
const instrumentSans = Instrument_Sans({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-instrument",
});

export default function Footer() {
  return (
    <footer
      className={`${instrumentSans.variable} w-full bg-[#225685] text-white py-[28px]`}
      style={{ fontFamily: "var(--font-instrument)" }}
    >
      <div className="mx-auto w-full max-w-[1280px] px-[50px] flex flex-col items-center gap-[35px]">
        {/* Heading */}
        <h2 className="text-center text-[26px] font-normal leading-none tracking-wide">
          Contact Us
        </h2>

        {/* Links Row */}
        <div className="flex flex-nowrap justify-center items-center gap-4 text-[11.5px] font-[400] leading-[100%]">
          <a
            href="#"
            className="flex items-center gap-1 hover:underline underline-offset-4"
          >
            <FaFacebookF size={13} /> Facebook@rachelrainmartin2013
          </a>

          <span>/</span>

          <a
            href="#"
            className="flex items-center gap-1 hover:underline underline-offset-4"
          >
            <Music size={13} /> TikTok@rachelrainmartin
          </a>

          <span>/</span>

          <a
            href="#"
            className="flex items-center gap-1 hover:underline underline-offset-4"
          >
            <FaYoutube size={13} /> YouTube@rachelrainmartin
          </a>

          <span>/</span>

          <a
            href="mailto:rachelrain@rachelrainmartin.com"
            className="flex items-center gap-1 hover:underline underline-offset-4"
          >
            <Mail size={13} /> Email: rachelrain@rachelrainmartin.com
          </a>

          <span>/</span>

          <a
            href="https://www.rachelrainmartin.com"
            className="flex items-center gap-1 hover:underline underline-offset-4"
          >
            <Globe size={13} /> Website: www.rachelrainmartin.com
          </a>
        </div>

        {/* Copyright */}
        <p className="text-center text-[12px] font-[400] leading-[100%] text-white">
          © 2025 Rachel Rain Martin / Privacy Policy / All Rights are Reserved
        </p>
      </div>
    </footer>
  );
}
