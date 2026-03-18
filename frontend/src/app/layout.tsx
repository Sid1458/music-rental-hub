/**
 * Root Layout — wraps all pages with Navbar, Footer, and global styles.
 * Metadata is set here for SEO.
 */

import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "MusicRent — Rent Premium Musical Instruments",
  description:
    "Rent guitars, drums, keyboards, and more for your next gig or rehearsal. Affordable daily and weekly rates with premium quality instruments.",
  keywords: [
    "music rental",
    "instrument rental",
    "rent guitar",
    "rent drums",
    "rent keyboard",
    "music equipment",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">
        <Navbar />
        {/* Main content area — pushed below fixed navbar */}
        <main className="flex-1 pt-16">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
