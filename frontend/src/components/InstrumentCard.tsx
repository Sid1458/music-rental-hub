/**
 * InstrumentCard Component
 * Displays individual instrument info with image, pricing, rating, and action buttons.
 * "View Details" links to the detail page; "Rent" pre-selects and goes to booking.
 */

"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAppStore } from "@/lib/store";
import { Instrument } from "@/lib/data";

interface InstrumentCardProps {
  instrument: Instrument;
}

/** Render star rating as filled/empty stars */
function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <svg
          key={star}
          className={`w-4 h-4 ${
            star <= Math.round(rating)
              ? "text-amber-400"
              : "text-gray-600"
          }`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
      <span className="text-xs text-gray-400 ml-1">{rating}</span>
    </div>
  );
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

        {/* Brand + Rating */}
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs text-gray-500">{instrument.brand}</span>
          <StarRating rating={instrument.rating} />
        </div>

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

        {/* Action Buttons */}
        <div className="flex gap-3">
          <Link
            href={`/instruments/${instrument.id}`}
            className="flex-1 py-3 rounded-xl bg-white/5 border border-white/10 text-gray-300 text-sm font-semibold text-center hover:bg-white/10 hover:text-white hover:border-white/20 transition-all duration-200"
          >
            View Details
          </Link>
          <button
            onClick={handleRent}
            disabled={!instrument.available}
            className="flex-1 py-3 rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white text-sm font-semibold hover:from-violet-500 hover:to-fuchsia-500 transition-all duration-200 shadow-lg shadow-violet-500/20 hover:shadow-violet-500/40 disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98] cursor-pointer"
          >
            Rent Now
          </button>
        </div>
      </div>
    </div>
  );
}
