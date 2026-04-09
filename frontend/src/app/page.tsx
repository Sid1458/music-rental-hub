/**
 * Home Page — Landing page with hero section, featured instruments, and stats.
 */

// Prevent Next.js from statically rendering this page at build time.
// Without this, `next build` would try to call the backend API (which doesn't
// exist in CI), causing the build to fail.
export const dynamic = "force-dynamic";

import Link from "next/link";
import { fetchFeaturedInstruments } from "@/lib/api";
import InstrumentCard from "@/components/InstrumentCard";

// Stats shown in the hero section
const stats = [
  { label: "Instruments", value: "50+" },
  { label: "Happy Users", value: "1,200+" },
  { label: "Cities", value: "15" },
];

// How-it-works steps
const steps = [
  {
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
      </svg>
    ),
    title: "Browse",
    desc: "Explore our collection of premium instruments across all categories.",
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
      </svg>
    ),
    title: "Book",
    desc: "Pick your dates, choose daily or weekly rental, and confirm.",
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 9l10.5-3m0 6.553v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 11-.99-3.467l2.31-.66a2.25 2.25 0 001.632-2.163zm0 0V2.25L9 5.25v10.303m0 0v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 01-.99-3.467l2.31-.66A2.25 2.25 0 009 15.553z" />
      </svg>
    ),
    title: "Play",
    desc: "Receive your instrument and start making music right away.",
  },
];

export default async function HomePage() {
  const featured = await fetchFeaturedInstruments();

  return (
    <>
      {/* ─── Hero Section ──────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden">
        {/* Background effects */}
        <div className="absolute inset-0 bg-gradient-to-br from-violet-950/40 via-gray-950 to-fuchsia-950/30" />
        <div className="absolute top-20 left-1/4 w-96 h-96 bg-violet-600/20 rounded-full blur-[120px] animate-pulse-glow" />
        <div className="absolute bottom-10 right-1/4 w-72 h-72 bg-fuchsia-600/15 rounded-full blur-[100px] animate-pulse-glow" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32 lg:py-40">
          <div className="text-center max-w-4xl mx-auto">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-400 text-sm font-medium mb-8">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              Now available in 15 cities
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-black leading-tight tracking-tight">
              Rent Premium{" "}
              <span className="text-gradient">Musical Instruments</span>{" "}
              Effortlessly
            </h1>

            {/* Subtitle */}
            <p className="mt-6 text-lg sm:text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
              From acoustic guitars to full drum kits — rent professional-grade
              instruments by the day or week. Perfect for gigs, events, studios,
              and practice sessions.
            </p>

            {/* CTA Buttons */}
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/instruments"
                className="px-8 py-4 rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white font-bold text-lg hover:from-violet-500 hover:to-fuchsia-500 transition-all duration-200 shadow-xl shadow-violet-500/25 hover:shadow-violet-500/40 hover:scale-105 active:scale-95"
              >
                Browse Instruments
              </Link>
              <Link
                href="/booking"
                className="px-8 py-4 rounded-xl bg-white/5 border border-white/10 text-white font-semibold text-lg hover:bg-white/10 hover:border-white/20 transition-all duration-200"
              >
                Book Now →
              </Link>
            </div>

            {/* Stats */}
            <div className="mt-16 flex items-center justify-center gap-8 sm:gap-16">
              {stats.map((stat) => (
                <div key={stat.label} className="text-center">
                  <p className="text-2xl sm:text-3xl font-bold text-white">
                    {stat.value}
                  </p>
                  <p className="text-sm text-gray-500 mt-1">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── How It Works ──────────────────────────────────────────────────── */}
      <section className="py-20 sm:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-white">
              How It Works
            </h2>
            <p className="text-gray-400 mt-3 max-w-lg mx-auto">
              Three simple steps to get the instrument you need
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((step, idx) => (
              <div
                key={step.title}
                className="relative group text-center p-8 rounded-2xl bg-gray-900/40 border border-white/5 hover:border-violet-500/30 transition-all duration-300"
              >
                {/* Step number */}
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-violet-600 text-white text-sm font-bold flex items-center justify-center shadow-lg shadow-violet-500/30">
                  {idx + 1}
                </div>
                <div className="w-14 h-14 mx-auto mb-5 rounded-xl bg-violet-500/10 text-violet-400 flex items-center justify-center group-hover:bg-violet-500/20 transition-colors">
                  {step.icon}
                </div>
                <h3 className="text-lg font-bold text-white mb-2">
                  {step.title}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Featured Instruments ──────────────────────────────────────────── */}
      <section className="py-20 sm:py-28 bg-gray-900/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-12 gap-4">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold text-white">
                Featured Instruments
              </h2>
              <p className="text-gray-400 mt-2">
                Our most popular rentals — handpicked for you
              </p>
            </div>
            <Link
              href="/instruments"
              className="text-violet-400 hover:text-violet-300 font-medium text-sm flex items-center gap-1 transition-colors"
            >
              View All
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featured.map((instrument) => (
              <InstrumentCard key={instrument.id} instrument={instrument} />
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA Banner ────────────────────────────────────────────────────── */}
      <section className="py-20 sm:py-28">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="relative p-10 sm:p-16 rounded-3xl bg-gradient-to-br from-violet-600/20 via-gray-900 to-fuchsia-600/20 border border-white/10 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-violet-600/5 to-fuchsia-600/5" />
            <div className="relative">
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                Ready to Make Music?
              </h2>
              <p className="text-gray-400 max-w-lg mx-auto mb-8">
                Join thousands of musicians who trust MusicRent for their
                instrument needs. No commitments, affordable pricing.
              </p>
              <Link
                href="/booking"
                className="inline-block px-8 py-4 rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white font-bold text-lg hover:from-violet-500 hover:to-fuchsia-500 transition-all duration-200 shadow-xl shadow-violet-500/25 hover:shadow-violet-500/40 hover:scale-105 active:scale-95"
              >
                Start Renting Today
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
