/**
 * Zustand Store — Global state management for Music Rental Hub
 *
 * Manages:
 * - Booking form state (selected instrument, form values)
 * - Cart / rental selections
 * - UI state (mobile menu, modals)
 *
 * When backend is ready, actions here can be extended with API calls.
 */

import { create } from "zustand";
import { Booking } from "./data";

// ─── Store Types ─────────────────────────────────────────────────────────────

interface BookingFormState {
  customerName: string;
  email: string;
  phone: string;
  instrumentId: string;
  instrumentName: string;
  duration: "day" | "week";
  startDate: string;
}

interface AppState {
  // Booking form
  bookingForm: BookingFormState;
  setBookingForm: (form: Partial<BookingFormState>) => void;
  resetBookingForm: () => void;

  // Bookings list (mock — will connect to API later)
  bookings: Booking[];
  addBooking: (booking: Booking) => void;

  // UI state
  isMobileMenuOpen: boolean;
  toggleMobileMenu: () => void;
  closeMobileMenu: () => void;

  // Selected instrument for booking
  selectInstrumentForBooking: (id: string, name: string) => void;
}

// ─── Default Values ──────────────────────────────────────────────────────────

const defaultBookingForm: BookingFormState = {
  customerName: "",
  email: "",
  phone: "",
  instrumentId: "",
  instrumentName: "",
  duration: "day",
  startDate: "",
};

// ─── Zustand Store ───────────────────────────────────────────────────────────

export const useAppStore = create<AppState>((set) => ({
  // Booking form state
  bookingForm: { ...defaultBookingForm },
  setBookingForm: (form) =>
    set((state) => ({
      bookingForm: { ...state.bookingForm, ...form },
    })),
  resetBookingForm: () =>
    set({ bookingForm: { ...defaultBookingForm } }),

  // Bookings list
  bookings: [],
  addBooking: (booking) =>
    set((state) => ({
      bookings: [...state.bookings, { ...booking, id: crypto.randomUUID() }],
    })),

  // UI
  isMobileMenuOpen: false,
  toggleMobileMenu: () =>
    set((state) => ({ isMobileMenuOpen: !state.isMobileMenuOpen })),
  closeMobileMenu: () => set({ isMobileMenuOpen: false }),

  // Pre-fill booking from instrument card
  selectInstrumentForBooking: (id, name) =>
    set((state) => ({
      bookingForm: {
        ...state.bookingForm,
        instrumentId: id,
        instrumentName: name,
      },
    })),
}));
