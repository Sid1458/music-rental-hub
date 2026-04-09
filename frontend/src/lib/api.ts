/**
 * API Layer — Connects frontend to the Express backend at localhost:5000.
 *
 * All functions make real fetch() calls to the backend.
 * The mock data is no longer used for instruments or bookings.
 */

import { Instrument, Booking } from "./data";

const API_BASE = "http://localhost:5000/api";

// ─── Image Mapping ────────────────────────────────────────────────────────────

/**
 * Maps an instrument's name and category to one of the available
 * images in /public/instruments/.
 */
function getInstrumentImage(name: string, category: string): string {
  const n = name.toLowerCase();
  const c = category.toLowerCase();

  if (n.includes("acoustic")) return "/instruments/acoustic-guitar.png";
  if (n.includes("electric guitar") || n.includes("stratocaster") || n.includes("les paul") || n.includes("telecaster"))
    return "/instruments/electric-guitar.png";
  if (n.includes("bass")) return "/instruments/electric-guitar.png";
  if (n.includes("violin") || n.includes("viola") || n.includes("cello"))
    return "/instruments/violin.png";
  if (n.includes("drum") || n.includes("percussion") || n.includes("snare") || n.includes("cymbal"))
    return "/instruments/drum-kit.png";
  if (n.includes("keyboard") || n.includes("piano") || n.includes("synth") || n.includes("organ"))
    return "/instruments/keyboard.png";
  if (n.includes("sax") || n.includes("trumpet") || n.includes("trombone") || n.includes("flute") || n.includes("clarinet") || n.includes("oboe"))
    return "/instruments/saxophone.png";

  // Fallback by category
  if (c.includes("string")) return "/instruments/acoustic-guitar.png";
  if (c.includes("percussion") || c.includes("drum")) return "/instruments/drum-kit.png";
  if (c.includes("key") || c.includes("piano")) return "/instruments/keyboard.png";
  if (c.includes("wind") || c.includes("brass") || c.includes("woodwind")) return "/instruments/saxophone.png";

  return "/instruments/acoustic-guitar.png";
}

// ─── Instruments ──────────────────────────────────────────────────────────────

/** Fetch all instruments from the backend */
export async function fetchAllInstruments(): Promise<Instrument[]> {
  const res = await fetch(`${API_BASE}/instruments`);
  if (!res.ok) throw new Error("Failed to fetch instruments");

  const data = await res.json();

  // Map backend fields to frontend Instrument interface
  return data.map((item: Record<string, unknown>) => ({
    id: String(item.id),
    name: item.name as string,
    category: (item.category as string) ?? "Other",
    brand: "",
    description: (item.description as string) ?? "",
    image: getInstrumentImage((item.name as string) ?? "", (item.category as string) ?? ""),
    pricePerDay: (item.price as number) ?? 0,
    pricePerWeek: ((item.price as number) ?? 0) * 5,
    rating: 4.5,
    available: true,
    featured: false,
  }));
}

/** Fetch only featured instruments (mocking featured flag for now by returning first 4) */
export async function fetchFeaturedInstruments(): Promise<Instrument[]> {
  const instruments = await fetchAllInstruments();
  return instruments.slice(0, 4);
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
    name: item.name as string,
    category: (item.category as string) ?? "Other",
    brand: "",
    description: (item.description as string) ?? "",
    image: getInstrumentImage((item.name as string) ?? "", (item.category as string) ?? ""),
    pricePerDay: (item.price as number) ?? 0,
    pricePerWeek: ((item.price as number) ?? 0) * 5,
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
