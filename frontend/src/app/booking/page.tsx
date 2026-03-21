/**
 * Booking Page — Rental booking form with context info.
 * Supports ?instrument=ID query param for pre-filling.
 */

"use client";

import { useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { useAppStore } from "@/lib/store";
import { getInstrumentById } from "@/lib/data";
import BookingForm from "@/components/BookingForm";
import PageHeader from "@/components/PageHeader";

/** Inner component that reads search params (must be inside Suspense) */
function BookingContent() {
  const searchParams = useSearchParams();
  const { setBookingForm } = useAppStore();

  // Pre-fill instrument from query param
  useEffect(() => {
    const instrumentId = searchParams.get("instrument");
    if (instrumentId) {
      const inst = getInstrumentById(instrumentId);
      if (inst) {
        setBookingForm({
          instrumentId: inst.id,
          instrumentName: inst.name,
        });
      }
    }
  }, [searchParams, setBookingForm]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
      {/* Form column */}
      <div className="lg:col-span-2">
        <BookingForm />
      </div>

      {/* Info sidebar */}
      <div className="space-y-6">
        {/* Why Rent */}
        <div className="bg-gray-900/60 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
          <h3 className="text-lg font-bold text-white mb-4">
            Why Rent With Us?
          </h3>
          <ul className="space-y-4">
            {[
              {
                icon: "🎸",
                title: "Premium Quality",
                desc: "All instruments are professionally maintained and tuned.",
              },
              {
                icon: "💰",
                title: "Affordable Rates",
                desc: "Daily and weekly options to fit every budget.",
              },
              {
                icon: "🚚",
                title: "Free Delivery",
                desc: "We deliver to your doorstep in select cities.",
              },
              {
                icon: "🛡️",
                title: "Insured Rentals",
                desc: "All rentals include basic damage protection.",
              },
            ].map((item) => (
              <li key={item.title} className="flex items-start gap-3">
                <span className="text-xl mt-0.5">{item.icon}</span>
                <div>
                  <p className="text-sm font-semibold text-white">
                    {item.title}
                  </p>
                  <p className="text-sm text-gray-500">{item.desc}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Support Box */}
        <div className="bg-violet-500/10 border border-violet-500/20 rounded-2xl p-6 text-center">
          <p className="text-sm text-gray-400 mb-2">Need help?</p>
          <p className="text-lg font-bold text-white">support@musicrent.com</p>
          <p className="text-sm text-gray-500 mt-1">Mon–Sat, 9 AM – 6 PM</p>
        </div>
      </div>
    </div>
  );
}

export default function BookingPage() {
  return (
    <div className="min-h-screen">
      <PageHeader
        title="Book Your"
        highlight="Rental"
        subtitle="Fill in the form below to reserve your instrument. Pick your dates and duration — we'll handle the rest."
      />

      <section className="pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Suspense>
            <BookingContent />
          </Suspense>
        </div>
      </section>
    </div>
  );
}
