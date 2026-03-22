/**
 * API Layer — Connects frontend to the Express backend at localhost:5000.
 *
 * All functions make real fetch() calls to the backend.
 * The mock data is no longer used for instruments or bookings.
 */

import { Instrument, Booking } from "./data";

const API_BASE = "http://localhost:5000/api";

// ─── Instruments ──────────────────────────────────────────────────────────────

/** Fetch all instruments from the backend */
export async function fetchAllInstruments(): Promise<Instrument[]> {
  const res = await fetch(`${API_BASE}/instruments`);
  if (!res.ok) throw new Error("Failed to fetch instruments");

  const data = await res.json();

  // Map backend fields to frontend Instrument interface
  return data.map((item: Record<string, unknown>) => ({
    id: String(item.id),
    name: item.name,
    category: item.category ?? "Other",
    brand: "",
    description: item.description ?? "",
    image: "/instruments/acoustic-guitar.png",
    pricePerDay: item.price ?? 0,
    pricePerWeek: (item.price as number ?? 0) * 5,
    rating: 4.5,
    available: true,
    featured: false,
  }));
}

/** Fetch a single instrument by ID */
export async function fetchInstrumentById(
  id: string
): Promise<Instrument | null> {
  const res = await fetch(`${API_BASE}/instruments/${id}`);
  if (!res.ok) return null;

  const item = await res.json();

  return {
    id: String(item.id),
    name: item.name,
    category: item.category ?? "Other",
    brand: "",
    description: item.description ?? "",
    image: "/instruments/acoustic-guitar.png",
    pricePerDay: item.price ?? 0,
    pricePerWeek: (item.price ?? 0) * 5,
    rating: 4.5,
    available: true,
    featured: false,
  };
}

/** Fetch unique categories from instruments */
export async function fetchCategories(): Promise<string[]> {
  const instruments = await fetchAllInstruments();
  return [...new Set(instruments.map((i) => i.category))];
}

// ─── Bookings ─────────────────────────────────────────────────────────────────

/** Submit a booking to the backend */
export async function submitBooking(
  booking: Omit<Booking, "id">
): Promise<{ success: boolean; bookingId: string }> {
  const res = await fetch(`${API_BASE}/bookings`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      user_name: booking.customerName,
      instrument_id: Number(booking.instrumentId),
      date: booking.startDate,
      duration: booking.duration,
    }),
  });

  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    throw new Error((error as { error?: string }).error || "Failed to create booking");
  }

  const data = await res.json();
  return {
    success: true,
    bookingId: String(data.id),
  };
}

/** Fetch all bookings from the backend */
export async function fetchAllBookings(): Promise<Booking[]> {
  const res = await fetch(`${API_BASE}/bookings`);
  if (!res.ok) throw new Error("Failed to fetch bookings");

  const data = await res.json();

  return data.map((item: Record<string, unknown>) => ({
    id: String(item.id),
    customerName: item.user_name,
    email: "",
    phone: "",
    instrumentId: String(item.instrument_id),
    instrumentName: item.instrument_name ?? "",
    duration: item.duration,
    startDate: item.date,
    totalPrice: 0,
  }));
}
