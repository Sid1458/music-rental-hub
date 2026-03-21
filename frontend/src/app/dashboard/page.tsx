/**
 * Dashboard Page — view all past bookings from Zustand store.
 */

"use client";

import Link from "next/link";
import { useAppStore } from "@/lib/store";
import { getInstrumentById } from "@/lib/data";
import PageHeader from "@/components/PageHeader";

export default function DashboardPage() {
  const bookings = useAppStore((s) => s.bookings);

  // Stats
  const totalBookings = bookings.length;
  const totalSpent = bookings.reduce((sum, b) => sum + b.totalPrice, 0);

  return (
    <div className="min-h-screen">
      <PageHeader
        title="Your"
        highlight="Dashboard"
        subtitle="Track all your instrument rentals in one place."
      />

      <section className="pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* ─── Stats Bar ─────────────────────────────────────────────── */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10 animate-fade-in-up">
            <div className="bg-gray-900/60 border border-white/10 rounded-2xl p-6 text-center">
              <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">
                Total Bookings
              </p>
              <p className="text-3xl font-bold text-white">{totalBookings}</p>
            </div>
            <div className="bg-gray-900/60 border border-white/10 rounded-2xl p-6 text-center">
              <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">
                Total Spent
              </p>
              <p className="text-3xl font-bold text-white">${totalSpent}</p>
            </div>
            <div className="bg-violet-500/10 border border-violet-500/20 rounded-2xl p-6 text-center">
              <p className="text-xs text-violet-400 uppercase tracking-wider mb-1">
                Status
              </p>
              <p className="text-3xl font-bold text-white">
                {totalBookings > 0 ? "Active" : "No Rentals"}
              </p>
            </div>
          </div>

          {/* ─── Bookings List ─────────────────────────────────────────── */}
          {bookings.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-center animate-fade-in-up">
              <div className="w-20 h-20 rounded-2xl bg-gray-800/60 border border-white/10 flex items-center justify-center mb-6">
                <svg
                  className="w-10 h-10 text-gray-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 9l10.5-3m0 6.553v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 11-.99-3.467l2.31-.66a2.25 2.25 0 001.632-2.163zm0 0V2.25L9 5.25v10.303m0 0v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 01-.99-3.467l2.31-.66A2.25 2.25 0 009 15.553z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">
                No bookings yet
              </h3>
              <p className="text-gray-400 text-sm max-w-sm mb-6">
                Browse our collection of premium instruments and make your first
                rental to see it here.
              </p>
              <Link
                href="/instruments"
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white font-semibold hover:from-violet-500 hover:to-fuchsia-500 transition-all duration-200 shadow-lg shadow-violet-500/25 hover:shadow-violet-500/40 hover:scale-105 active:scale-95"
              >
                Browse Instruments
              </Link>
            </div>
          ) : (
            <div className="space-y-4 animate-fade-in-up">
              {bookings.map((booking, idx) => {
                const inst = getInstrumentById(booking.instrumentId);
                return (
                  <div
                    key={booking.id || idx}
                    className="bg-gray-900/60 border border-white/10 rounded-2xl p-5 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center gap-4 hover:border-violet-500/30 transition-all duration-300"
                  >
                    {/* Instrument icon/info */}
                    <div className="flex items-center gap-4 flex-1 min-w-0">
                      <div className="w-12 h-12 rounded-xl bg-violet-500/10 flex items-center justify-center shrink-0">
                        <svg
                          className="w-6 h-6 text-violet-400"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={1.5}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M9 9l10.5-3m0 6.553v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 11-.99-3.467l2.31-.66a2.25 2.25 0 001.632-2.163zm0 0V2.25L9 5.25v10.303m0 0v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 01-.99-3.467l2.31-.66A2.25 2.25 0 009 15.553z"
                          />
                        </svg>
                      </div>
                      <div className="min-w-0">
                        <h4 className="text-white font-semibold truncate">
                          {booking.instrumentName}
                        </h4>
                        <p className="text-gray-500 text-sm">
                          {inst?.category ?? "Instrument"} · {inst?.brand ?? ""}
                        </p>
                      </div>
                    </div>

                    {/* Details */}
                    <div className="flex flex-wrap items-center gap-3 sm:gap-6 text-sm">
                      <div>
                        <p className="text-xs text-gray-500">Duration</p>
                        <p className="text-gray-300 font-medium capitalize">
                          {booking.duration === "day" ? "1 Day" : "1 Week"}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Start Date</p>
                        <p className="text-gray-300 font-medium">
                          {booking.startDate}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Customer</p>
                        <p className="text-gray-300 font-medium truncate max-w-[120px]">
                          {booking.customerName}
                        </p>
                      </div>
                      <div className="bg-violet-500/10 border border-violet-500/20 rounded-xl px-4 py-2 text-center">
                        <p className="text-xs text-violet-400">Total</p>
                        <p className="text-lg font-bold text-white">
                          ${booking.totalPrice}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
