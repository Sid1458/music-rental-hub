/**
 * Instruments Page — Browse all available instruments with category filtering.
 */

"use client";

import { useState } from "react";
import { getAllInstruments, getCategories } from "@/lib/data";
import InstrumentCard from "@/components/InstrumentCard";

export default function InstrumentsPage() {
  const allInstruments = getAllInstruments();
  const categories = getCategories();
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  // Filter instruments by category
  const filtered =
    selectedCategory === "All"
      ? allInstruments
      : allInstruments.filter((i) => i.category === selectedCategory);

  return (
    <div className="min-h-screen">
      {/* Page Header */}
      <section className="relative py-16 sm:py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-violet-950/30 to-transparent" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl font-black text-white">
            Our <span className="text-gradient">Instruments</span>
          </h1>
          <p className="mt-4 text-gray-400 max-w-xl mx-auto text-lg">
            Browse our full collection of premium instruments available for
            rental. From strings to percussion — we&apos;ve got you covered.
          </p>
        </div>
      </section>

      {/* Category Filter + Grid */}
      <section className="pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Category Pills */}
          <div className="flex flex-wrap items-center gap-2 mb-10 justify-center">
            <button
              onClick={() => setSelectedCategory("All")}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 cursor-pointer ${
                selectedCategory === "All"
                  ? "bg-violet-600 text-white shadow-lg shadow-violet-500/25"
                  : "bg-white/5 text-gray-400 border border-white/10 hover:bg-white/10 hover:text-white"
              }`}
            >
              All
            </button>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 cursor-pointer ${
                  selectedCategory === cat
                    ? "bg-violet-600 text-white shadow-lg shadow-violet-500/25"
                    : "bg-white/5 text-gray-400 border border-white/10 hover:bg-white/10 hover:text-white"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Results count */}
          <p className="text-sm text-gray-500 mb-6">
            Showing {filtered.length} instrument{filtered.length !== 1 && "s"}
            {selectedCategory !== "All" && (
              <> in <span className="text-violet-400">{selectedCategory}</span></>
            )}
          </p>

          {/* Instruments Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((instrument) => (
              <InstrumentCard key={instrument.id} instrument={instrument} />
            ))}
          </div>

          {/* Empty state */}
          {filtered.length === 0 && (
            <div className="text-center py-20">
              <p className="text-gray-500 text-lg">
                No instruments found in this category.
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
