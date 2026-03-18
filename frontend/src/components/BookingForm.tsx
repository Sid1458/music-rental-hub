/**
 * BookingForm Component
 * Handles instrument rental booking with form validation.
 * Uses Zustand store for form state (pre-filled when coming from instrument card).
 * Ready for API integration — just replace the mock submit with an API call.
 */

"use client";

import { useState } from "react";
import { useAppStore } from "@/lib/store";
import { instruments, getInstrumentById } from "@/lib/data";

export default function BookingForm() {
  const { bookingForm, setBookingForm, resetBookingForm, addBooking } =
    useAppStore();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Calculate total price based on selected instrument and duration
  const selectedInstrument = bookingForm.instrumentId
    ? getInstrumentById(bookingForm.instrumentId)
    : null;
  const totalPrice = selectedInstrument
    ? bookingForm.duration === "day"
      ? selectedInstrument.pricePerDay
      : selectedInstrument.pricePerWeek
    : 0;

  /** Handle form submission (mock — replace with API call later) */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1200));

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

    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  /** Reset form for new booking */
  const handleReset = () => {
    resetBookingForm();
    setIsSubmitted(false);
  };

  // ─── Success State ───────────────────────────────────────────────────────

  if (isSubmitted) {
    return (
      <div className="max-w-lg mx-auto text-center py-16 px-6">
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
        <h2 className="text-3xl font-bold text-white mb-3">Booking Confirmed!</h2>
        <p className="text-gray-400 mb-2">
          Your rental for <span className="text-violet-400 font-semibold">{bookingForm.instrumentName}</span> has been booked.
        </p>
        <p className="text-gray-500 text-sm mb-8">
          We&apos;ll send confirmation details to your email.
        </p>
        <button
          onClick={handleReset}
          className="px-8 py-3 rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white font-semibold hover:from-violet-500 hover:to-fuchsia-500 transition-all duration-200 shadow-lg shadow-violet-500/25 cursor-pointer"
        >
          Book Another Instrument
        </button>
      </div>
    );
  }

  // ─── Booking Form ────────────────────────────────────────────────────────

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-2xl mx-auto bg-gray-900/60 backdrop-blur-sm border border-white/10 rounded-2xl p-6 sm:p-8 space-y-6"
    >
      <div className="text-center mb-2">
        <h2 className="text-2xl font-bold text-white">Book Your Instrument</h2>
        <p className="text-gray-400 text-sm mt-1">
          Fill in the details below to reserve your rental
        </p>
      </div>

      {/* Customer Name */}
      <div>
        <label htmlFor="customerName" className="block text-sm font-medium text-gray-300 mb-2">
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
        <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
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
        <label htmlFor="phone" className="block text-sm font-medium text-gray-300 mb-2">
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
        <label htmlFor="instrument" className="block text-sm font-medium text-gray-300 mb-2">
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
          className="w-full px-4 py-3 rounded-xl bg-gray-800/80 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-violet-500/50 focus:border-violet-500/50 transition-all appearance-none cursor-pointer"
        >
          <option value="" className="bg-gray-900">
            Choose an instrument...
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
          <label htmlFor="duration" className="block text-sm font-medium text-gray-300 mb-2">
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
          <label htmlFor="startDate" className="block text-sm font-medium text-gray-300 mb-2">
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
              {selectedInstrument.name} · {bookingForm.duration === "day" ? "1 Day" : "1 Week"}
            </p>
          </div>
          <p className="text-3xl font-bold text-white">
            ${totalPrice}
          </p>
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
            <svg className="animate-spin w-5 h-5" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
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
