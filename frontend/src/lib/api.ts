/**
 * Mock API Layer — simulates backend calls with async delay.
 * Replace these functions with real fetch() calls when backend is ready.
 */

import {
  Instrument,
  Booking,
  getAllInstruments,
  getInstrumentById,
  getCategories,
} from "./data";

const SIMULATED_DELAY = 400; // ms

/** Simulate network latency */
const delay = (ms: number = SIMULATED_DELAY) =>
  new Promise((resolve) => setTimeout(resolve, ms));

/** Fetch all instruments */
export async function fetchAllInstruments(): Promise<Instrument[]> {
  await delay();
  return getAllInstruments();
}

/** Fetch a single instrument by ID */
export async function fetchInstrumentById(
  id: string
): Promise<Instrument | null> {
  await delay();
  return getInstrumentById(id) ?? null;
}

/** Fetch unique categories */
export async function fetchCategories(): Promise<string[]> {
  await delay();
  return getCategories();
}

/** Submit a booking (mock) */
export async function submitBooking(
  booking: Omit<Booking, "id">
): Promise<{ success: boolean; bookingId: string }> {
  await delay(1200);
  return {
    success: true,
    bookingId: crypto.randomUUID(),
  };
}
