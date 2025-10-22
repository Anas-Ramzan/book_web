import "./globals.css";
import { Kodchasan } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const kodchasan = Kodchasan({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-kodchasan",
});


export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={kodchasan.variable}>
      <body className="min-h-screen antialiased bg-white text-black">
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
