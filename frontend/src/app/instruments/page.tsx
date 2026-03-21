/**
 * Instruments Page — Browse all available instruments with search, filter, and sort.
 */

"use client";

import { useState, useEffect, useMemo } from "react";
import { fetchAllInstruments, fetchCategories } from "@/lib/api";
import { Instrument } from "@/lib/data";
import InstrumentCard from "@/components/InstrumentCard";
import PageHeader from "@/components/PageHeader";
import LoadingSpinner from "@/components/LoadingSpinner";
import EmptyState from "@/components/EmptyState";

type SortOption = "default" | "price-low" | "price-high";

export default function InstrumentsPage() {
  const [instruments, setInstruments] = useState<Instrument[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState<SortOption>("default");

  // Fetch data on mount
  useEffect(() => {
    async function load() {
      setLoading(true);
      const [allInstruments, allCategories] = await Promise.all([
        fetchAllInstruments(),
        fetchCategories(),
      ]);
      setInstruments(allInstruments);
      setCategories(allCategories);
      setLoading(false);
    }
    load();
  }, []);

  // Filtered + sorted results
  const filtered = useMemo(() => {
    let result = [...instruments];

    // Search
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (i) =>
          i.name.toLowerCase().includes(q) ||
          i.brand.toLowerCase().includes(q)
      );
    }

    // Category
    if (selectedCategory !== "All") {
      result = result.filter((i) => i.category === selectedCategory);
    }

    // Sort
    if (sortBy === "price-low") {
      result.sort((a, b) => a.pricePerDay - b.pricePerDay);
    } else if (sortBy === "price-high") {
      result.sort((a, b) => b.pricePerDay - a.pricePerDay);
    }

    return result;
  }, [instruments, search, selectedCategory, sortBy]);

  return (
    <div className="min-h-screen">
      <PageHeader
        title="Our"
        highlight="Instruments"
        subtitle="Browse our full collection of premium instruments available for rental. From strings to percussion — we've got you covered."
      />

      <section className="pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* ─── Search + Sort Controls ─────────────────────────────────── */}
          <div className="flex flex-col sm:flex-row gap-4 mb-8 animate-fade-in-up">
            {/* Search Bar */}
            <div className="relative flex-1">
              <svg
                className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                />
              </svg>
              <input
                type="text"
                placeholder="Search instruments by name or brand..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-xl bg-gray-900/60 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-violet-500/50 focus:border-violet-500/50 transition-all"
              />
            </div>

            {/* Sort Dropdown */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
              className="px-4 py-3 rounded-xl bg-gray-900/60 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-violet-500/50 focus:border-violet-500/50 transition-all appearance-none cursor-pointer sm:w-52"
            >
              <option value="default" className="bg-gray-900">
                Sort: Default
              </option>
              <option value="price-low" className="bg-gray-900">
                Price: Low → High
              </option>
              <option value="price-high" className="bg-gray-900">
                Price: High → Low
              </option>
            </select>
          </div>

          {/* ─── Category Pills ─────────────────────────────────────────── */}
          <div className="flex flex-wrap items-center gap-2 mb-10 animate-fade-in-up-delay">
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

          {/* ─── Loading / Results / Empty ─────────────────────────────── */}
          {loading ? (
            <LoadingSpinner text="Loading instruments..." />
          ) : filtered.length === 0 ? (
            <EmptyState
              title="No instruments found"
              description="Try adjusting your search or removing some filters."
            />
          ) : (
            <>
              {/* Results count */}
              <p className="text-sm text-gray-500 mb-6">
                Showing {filtered.length} instrument
                {filtered.length !== 1 && "s"}
                {selectedCategory !== "All" && (
                  <>
                    {" "}
                    in{" "}
                    <span className="text-violet-400">{selectedCategory}</span>
                  </>
                )}
                {search.trim() && (
                  <>
                    {" "}
                    matching{" "}
                    <span className="text-violet-400">
                      &ldquo;{search}&rdquo;
                    </span>
                  </>
                )}
              </p>

              {/* Instruments Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filtered.map((instrument) => (
                  <InstrumentCard key={instrument.id} instrument={instrument} />
                ))}
              </div>
            </>
          )}
        </div>
      </section>
    </div>
  );
}
