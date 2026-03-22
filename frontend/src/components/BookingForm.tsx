/**
 * BookingForm Component
 * Handles instrument rental booking with form validation.
 * Uses Zustand store for form state (pre-filled when coming from instrument card).
 * Ready for API integration — just replace the mock submit with an API call.
 */

"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useAppStore } from "@/lib/store";
import { getInstrumentById } from "@/lib/data";
import { fetchAllInstruments, submitBooking } from "@/lib/api";
import { Instrument } from "@/lib/data";

export default function BookingForm() {
  const { bookingForm, setBookingForm, resetBookingForm, addBooking } =
    useAppStore();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [instruments, setInstruments] = useState<Instrument[]>([]);
  const [loadingInstruments, setLoadingInstruments] = useState(true);

  // Load instruments for the dropdown
  useEffect(() => {
    async function load() {
      setLoadingInstruments(true);
      const all = await fetchAllInstruments();
      setInstruments(all);
      setLoadingInstruments(false);
    }
    load();
  }, []);

  // Calculate total price based on selected instrument and duration
  const selectedInstrument = bookingForm.instrumentId
    ? getInstrumentById(bookingForm.instrumentId)
    : null;
  const totalPrice = selectedInstrument
    ? bookingForm.duration === "day"
      ? selectedInstrument.pricePerDay
      : selectedInstrument.pricePerWeek
    : 0;

  /** Handle form submission — sends booking to the backend API */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // POST booking to the backend
      await submitBooking({
        customerName: bookingForm.customerName,
        email: bookingForm.email,
        phone: bookingForm.phone,
        instrumentId: bookingForm.instrumentId,
        instrumentName: bookingForm.instrumentName,
        duration: bookingForm.duration,
        startDate: bookingForm.startDate,
        totalPrice,
      });

      // Also save to local store for the dashboard
      addBooking({
        customerName: bookingForm.customerName,
        email: bookingForm.email,
        phone: bookingForm.phone,
        instrumentId: bookingForm.instrumentId,
        instrumentName: bookingForm.instrumentName,
        duration: bookingForm.duration,
        startDate: bookingForm.startDate,
        totalPrice,
      });

      setIsSubmitted(true);
    } catch (error) {
      alert(error instanceof Error ? error.message : "Booking failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  /** Reset form for new booking */
  const handleReset = () => {
    resetBookingForm();
    setIsSubmitted(false);
  };

  // ─── Success / Confirmation State ─────────────────────────────────────────

  if (isSubmitted) {
    return (
      <div className="max-w-lg mx-auto py-10 px-6 animate-fade-in-up">
        {/* Success icon */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-emerald-500/20 flex items-center justify-center">
            <svg
              className="w-10 h-10 text-emerald-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <h2 className="text-3xl font-bold text-white mb-2">
            Booking Confirmed!
          </h2>
          <p className="text-gray-400">
            Your rental has been successfully booked.
          </p>
        </div>

        {/* Booking Summary Card */}
        <div className="bg-gray-900/60 border border-white/10 rounded-2xl p-6 space-y-4 mb-8">
          <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">
            Booking Summary
          </h3>

          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-gray-400 text-sm">Instrument</span>
              <span className="text-white font-semibold">
                {bookingForm.instrumentName}
              </span>
            </div>
            <div className="w-full h-px bg-white/5" />
            <div className="flex justify-between items-center">
              <span className="text-gray-400 text-sm">Duration</span>
              <span className="text-white font-medium">
                {bookingForm.duration === "day" ? "1 Day" : "1 Week"}
              </span>
            </div>
            <div className="w-full h-px bg-white/5" />
            <div className="flex justify-between items-center">
              <span className="text-gray-400 text-sm">Start Date</span>
              <span className="text-white font-medium">
                {bookingForm.startDate}
              </span>
            </div>
            <div className="w-full h-px bg-white/5" />
            <div className="flex justify-between items-center">
              <span className="text-gray-400 text-sm">Customer</span>
              <span className="text-white font-medium">
                {bookingForm.customerName}
              </span>
            </div>
            <div className="w-full h-px bg-white/5" />
            <div className="flex justify-between items-center">
              <span className="text-gray-400 text-sm">Email</span>
              <span className="text-white font-medium">
                {bookingForm.email}
              </span>
            </div>
          </div>

          {/* Total */}
          <div className="bg-violet-500/10 border border-violet-500/20 rounded-xl p-4 flex items-center justify-between mt-4">
            <span className="text-gray-300 font-medium">Total Price</span>
            <span className="text-3xl font-bold text-white">${totalPrice}</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={handleReset}
            className="flex-1 px-6 py-3 rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white font-semibold hover:from-violet-500 hover:to-fuchsia-500 transition-all duration-200 shadow-lg shadow-violet-500/25 cursor-pointer"
          >
            Book Another Instrument
          </button>
          <Link
            href="/dashboard"
            className="flex-1 px-6 py-3 rounded-xl bg-white/5 border border-white/10 text-gray-300 font-semibold text-center hover:bg-white/10 hover:text-white transition-all duration-200"
          >
            Go to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  // ─── Booking Form ────────────────────────────────────────────────────────

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-2xl mx-auto bg-gray-900/60 backdrop-blur-sm border border-white/10 rounded-2xl p-6 sm:p-8 space-y-6 animate-fade-in-up"
    >
      <div className="text-center mb-2">
        <h2 className="text-2xl font-bold text-white">Book Your Instrument</h2>
        <p className="text-gray-400 text-sm mt-1">
          Fill in the details below to reserve your rental
        </p>
      </div>

      {/* Customer Name */}
      <div>
        <label
          htmlFor="customerName"
          className="block text-sm font-medium text-gray-300 mb-2"
        >
          Full Name
        </label>
        <input
          id="customerName"
          type="text"
          required
          placeholder="Enter your full name"
          value={bookingForm.customerName}
          onChange={(e) => setBookingForm({ customerName: e.target.value })}
          className="w-full px-4 py-3 rounded-xl bg-gray-800/80 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-violet-500/50 focus:border-violet-500/50 transition-all"
        />
      </div>

      {/* Email */}
      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-300 mb-2"
        >
          Email Address
        </label>
        <input
          id="email"
          type="email"
          required
          placeholder="you@example.com"
          value={bookingForm.email}
          onChange={(e) => setBookingForm({ email: e.target.value })}
          className="w-full px-4 py-3 rounded-xl bg-gray-800/80 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-violet-500/50 focus:border-violet-500/50 transition-all"
        />
      </div>

      {/* Phone */}
      <div>
        <label
          htmlFor="phone"
          className="block text-sm font-medium text-gray-300 mb-2"
        >
          Phone Number
        </label>
        <input
          id="phone"
          type="tel"
          required
          placeholder="+1 (555) 000-0000"
          value={bookingForm.phone}
          onChange={(e) => setBookingForm({ phone: e.target.value })}
          className="w-full px-4 py-3 rounded-xl bg-gray-800/80 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-violet-500/50 focus:border-violet-500/50 transition-all"
        />
      </div>

      {/* Instrument Selector */}
      <div>
        <label
          htmlFor="instrument"
          className="block text-sm font-medium text-gray-300 mb-2"
        >
          Select Instrument
        </label>
        <select
          id="instrument"
          required
          value={bookingForm.instrumentId}
          onChange={(e) => {
            const inst = instruments.find((i) => i.id === e.target.value);
            setBookingForm({
              instrumentId: e.target.value,
              instrumentName: inst?.name || "",
            });
          }}
          disabled={loadingInstruments}
          className="w-full px-4 py-3 rounded-xl bg-gray-800/80 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-violet-500/50 focus:border-violet-500/50 transition-all appearance-none cursor-pointer disabled:opacity-50"
        >
          <option value="" className="bg-gray-900">
            {loadingInstruments ? "Loading..." : "Choose an instrument..."}
          </option>
          {instruments.map((inst) => (
            <option key={inst.id} value={inst.id} className="bg-gray-900">
              {inst.name} — ${inst.pricePerDay}/day | ${inst.pricePerWeek}/week
            </option>
          ))}
        </select>
      </div>

      {/* Duration + Date Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Duration */}
        <div>
          <label
            htmlFor="duration"
            className="block text-sm font-medium text-gray-300 mb-2"
          >
            Rental Duration
          </label>
          <select
            id="duration"
            value={bookingForm.duration}
            onChange={(e) =>
              setBookingForm({ duration: e.target.value as "day" | "week" })
            }
            className="w-full px-4 py-3 rounded-xl bg-gray-800/80 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-violet-500/50 focus:border-violet-500/50 transition-all appearance-none cursor-pointer"
          >
            <option value="day" className="bg-gray-900">
              1 Day
            </option>
            <option value="week" className="bg-gray-900">
              1 Week
            </option>
          </select>
        </div>

        {/* Start Date */}
        <div>
          <label
            htmlFor="startDate"
            className="block text-sm font-medium text-gray-300 mb-2"
          >
            Start Date
          </label>
          <input
            id="startDate"
            type="date"
            required
            value={bookingForm.startDate}
            onChange={(e) => setBookingForm({ startDate: e.target.value })}
            className="w-full px-4 py-3 rounded-xl bg-gray-800/80 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-violet-500/50 focus:border-violet-500/50 transition-all cursor-pointer"
          />
        </div>
      </div>

      {/* Price Summary */}
      {selectedInstrument && (
        <div className="bg-violet-500/10 border border-violet-500/20 rounded-xl p-4 flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-400">Estimated Total</p>
            <p className="text-sm text-gray-500 mt-0.5">
              {selectedInstrument.name} ·{" "}
              {bookingForm.duration === "day" ? "1 Day" : "1 Week"}
            </p>
          </div>
          <p className="text-3xl font-bold text-white">${totalPrice}</p>
        </div>
      )}

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full py-4 rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white font-bold text-lg hover:from-violet-500 hover:to-fuchsia-500 transition-all duration-200 shadow-lg shadow-violet-500/25 hover:shadow-violet-500/40 disabled:opacity-60 disabled:cursor-not-allowed active:scale-[0.98] cursor-pointer"
      >
        {isSubmitting ? (
          <span className="flex items-center justify-center gap-2">
            <svg
              className="animate-spin w-5 h-5"
              viewBox="0 0 24 24"
              fill="none"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
              />
            </svg>
            Processing...
          </span>
        ) : (
          `Confirm Booking${totalPrice ? ` — $${totalPrice}` : ""}`
        )}
      </button>
    </form>
  );
}
