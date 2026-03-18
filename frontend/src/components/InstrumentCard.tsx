/**
 * InstrumentCard Component
 * Displays individual instrument info with image, pricing, and a Rent button.
 * Clicking "Rent" pre-selects the instrument and navigates to booking page.
 */

"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useAppStore } from "@/lib/store";
import { Instrument } from "@/lib/data";

interface InstrumentCardProps {
  instrument: Instrument;
}

export default function InstrumentCard({ instrument }: InstrumentCardProps) {
  const router = useRouter();
  const selectInstrumentForBooking = useAppStore(
    (state) => state.selectInstrumentForBooking
  );

  /** Handle rent button — set selected instrument in store and navigate */
  const handleRent = () => {
    selectInstrumentForBooking(instrument.id, instrument.name);
    router.push("/booking");
  };

  return (
    <div className="group relative bg-gray-900/60 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden hover:border-violet-500/40 transition-all duration-300 hover:shadow-xl hover:shadow-violet-500/10 hover:-translate-y-1">
      {/* Image Container */}
      <div className="relative h-56 overflow-hidden bg-gray-800/50">
        <Image
          src={instrument.image}
          alt={instrument.name}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-500"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        {/* Category badge */}
        <div className="absolute top-3 left-3">
          <span className="px-3 py-1 text-xs font-semibold rounded-full bg-violet-500/90 text-white backdrop-blur-sm">
            {instrument.category}
          </span>
        </div>
        {/* Availability badge */}
        {instrument.available && (
          <div className="absolute top-3 right-3">
            <span className="px-2 py-1 text-xs font-medium rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
              Available
            </span>
          </div>
        )}
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent opacity-60" />
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="text-lg font-bold text-white mb-1 group-hover:text-violet-300 transition-colors">
          {instrument.name}
        </h3>
        <p className="text-gray-400 text-sm leading-relaxed line-clamp-2 mb-4">
          {instrument.description}
        </p>

        {/* Pricing */}
        <div className="flex items-center gap-4 mb-4">
          <div className="flex flex-col">
            <span className="text-xs text-gray-500 uppercase tracking-wider">Per Day</span>
            <span className="text-lg font-bold text-white">
              ${instrument.pricePerDay}
            </span>
          </div>
          <div className="w-px h-8 bg-white/10" />
          <div className="flex flex-col">
            <span className="text-xs text-gray-500 uppercase tracking-wider">Per Week</span>
            <span className="text-lg font-bold text-violet-400">
              ${instrument.pricePerWeek}
            </span>
          </div>
        </div>

        {/* Rent Button */}
        <button
          onClick={handleRent}
          disabled={!instrument.available}
          className="w-full py-3 rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white text-sm font-semibold hover:from-violet-500 hover:to-fuchsia-500 transition-all duration-200 shadow-lg shadow-violet-500/20 hover:shadow-violet-500/40 disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98] cursor-pointer"
        >
          Rent This Instrument
        </button>
      </div>
    </div>
  );
}
