/**
 * Instrument Detail Page — dynamic route /instruments/[id]
 * Shows full instrument details, pricing, and related instruments.
 */

"use client";

import { useEffect, useState, use } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAppStore } from "@/lib/store";
import { fetchInstrumentById, fetchAllInstruments } from "@/lib/api";
import { Instrument } from "@/lib/data";
import LoadingSpinner from "@/components/LoadingSpinner";
import InstrumentCard from "@/components/InstrumentCard";

export default function InstrumentDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const router = useRouter();
  const selectInstrumentForBooking = useAppStore(
    (s) => s.selectInstrumentForBooking
  );

  const [instrument, setInstrument] = useState<Instrument | null>(null);
  const [related, setRelated] = useState<Instrument[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      setLoading(true);
      const [inst, all] = await Promise.all([
        fetchInstrumentById(id),
        fetchAllInstruments(),
      ]);
      setInstrument(inst);
      if (inst) {
        setRelated(
          all
            .filter((i) => i.category === inst.category && i.id !== inst.id)
            .slice(0, 3)
        );
      }
      setLoading(false);
    }
    load();
  }, [id]);

  const handleRent = () => {
    if (!instrument) return;
    selectInstrumentForBooking(instrument.id, instrument.name);
    router.push("/booking");
  };

  if (loading) {
    return (
      <div className="min-h-screen">
        <LoadingSpinner text="Loading instrument details..." />
      </div>
    );
  }

  if (!instrument) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <div className="w-20 h-20 rounded-2xl bg-gray-800/60 border border-white/10 flex items-center justify-center">
          <svg className="w-10 h-10 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
          </svg>
        </div>
        <h2 className="text-xl font-bold text-white">Instrument Not Found</h2>
        <p className="text-gray-400 text-sm">
          The instrument you&apos;re looking for doesn&apos;t exist.
        </p>
        <Link
          href="/instruments"
          className="mt-2 px-6 py-3 rounded-xl bg-violet-600 text-white font-semibold hover:bg-violet-500 transition-colors"
        >
          Browse Instruments
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* ─── Main Detail Section ─────────────────────────────────────────── */}
      <section className="py-10 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back link */}
          <Link
            href="/instruments"
            className="inline-flex items-center gap-2 text-gray-400 hover:text-white text-sm font-medium mb-8 transition-colors group"
          >
            <svg className="w-4 h-4 group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
            Back to Instruments
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 animate-fade-in-up">
            {/* Image */}
            <div className="relative aspect-[4/3] rounded-3xl overflow-hidden bg-gray-800/50 border border-white/10">
              <Image
                src={instrument.image}
                alt={instrument.name}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
              {/* Category badge */}
              <div className="absolute top-4 left-4">
                <span className="px-4 py-1.5 text-sm font-semibold rounded-full bg-violet-500/90 text-white backdrop-blur-sm">
                  {instrument.category}
                </span>
              </div>
            </div>

            {/* Details */}
            <div className="flex flex-col justify-center">
              {/* Brand */}
              <p className="text-sm text-violet-400 font-medium uppercase tracking-wider mb-2">
                {instrument.brand}
              </p>

              {/* Name */}
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-tight mb-4">
                {instrument.name}
              </h1>

              {/* Rating */}
              <div className="flex items-center gap-2 mb-6">
                <div className="flex items-center gap-0.5">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg
                      key={star}
                      className={`w-5 h-5 ${
                        star <= Math.round(instrument.rating)
                          ? "text-amber-400"
                          : "text-gray-600"
                      }`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <span className="text-gray-400 text-sm font-medium">{instrument.rating} / 5</span>
              </div>

              {/* Availability */}
              <div className="mb-6">
                {instrument.available ? (
                  <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-sm font-medium">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    Available for Rent
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-500/10 text-red-400 border border-red-500/20 text-sm font-medium">
                    <span className="w-2 h-2 rounded-full bg-red-400" />
                    Currently Unavailable
                  </span>
                )}
              </div>

              {/* Description */}
              <p className="text-gray-400 leading-relaxed mb-8">
                {instrument.description}
              </p>

              {/* Pricing Cards */}
              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="bg-gray-900/60 border border-white/10 rounded-2xl p-5 text-center">
                  <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Per Day</p>
                  <p className="text-3xl font-bold text-white">${instrument.pricePerDay}</p>
                </div>
                <div className="bg-violet-500/10 border border-violet-500/20 rounded-2xl p-5 text-center">
                  <p className="text-xs text-violet-400 uppercase tracking-wider mb-1">Per Week</p>
                  <p className="text-3xl font-bold text-white">${instrument.pricePerWeek}</p>
                  <p className="text-xs text-emerald-400 mt-1">
                    Save {Math.round((1 - instrument.pricePerWeek / (instrument.pricePerDay * 7)) * 100)}%
                  </p>
                </div>
              </div>

              {/* Rent Button */}
              <button
                onClick={handleRent}
                disabled={!instrument.available}
                className="w-full py-4 rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white font-bold text-lg hover:from-violet-500 hover:to-fuchsia-500 transition-all duration-200 shadow-xl shadow-violet-500/25 hover:shadow-violet-500/40 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
              >
                Rent Now — from ${instrument.pricePerDay}/day
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Related Instruments ─────────────────────────────────────────── */}
      {related.length > 0 && (
        <section className="py-16 sm:py-20 bg-gray-900/20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-8">
              Related Instruments
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {related.map((inst) => (
                <InstrumentCard key={inst.id} instrument={inst} />
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
