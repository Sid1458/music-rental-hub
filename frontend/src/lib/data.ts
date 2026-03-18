/**
 * Mock data for Music Rental Hub
 * This file contains all instrument data and type definitions.
 * Replace with API calls when backend is ready.
 */

// ─── Type Definitions ────────────────────────────────────────────────────────

export interface Instrument {
  id: string;
  name: string;
  category: string;
  description: string;
  image: string;
  pricePerDay: number;
  pricePerWeek: number;
  available: boolean;
  featured: boolean;
}

export interface Booking {
  id?: string;
  customerName: string;
  email: string;
  phone: string;
  instrumentId: string;
  instrumentName: string;
  duration: "day" | "week";
  startDate: string;
  totalPrice: number;
}

// ─── Mock Instruments Data ───────────────────────────────────────────────────

export const instruments: Instrument[] = [
  {
    id: "1",
    name: "Acoustic Guitar",
    category: "String",
    description:
      "Premium acoustic guitar with warm tones, perfect for unplugged sessions, campfires, and intimate performances. Features solid spruce top and mahogany body.",
    image: "/instruments/acoustic-guitar.png",
    pricePerDay: 15,
    pricePerWeek: 80,
    available: true,
    featured: true,
  },
  {
    id: "2",
    name: "Electric Guitar",
    category: "String",
    description:
      "Versatile electric guitar ideal for rock, blues, jazz, and everything in between. Comes with built-in pickups and a sleek metallic finish.",
    image: "/instruments/electric-guitar.png",
    pricePerDay: 20,
    pricePerWeek: 110,
    available: true,
    featured: true,
  },
  {
    id: "3",
    name: "Drum Kit",
    category: "Percussion",
    description:
      "Professional 5-piece drum kit with cymbals, hi-hat, and all hardware included. Perfect for live gigs, studio recording, and practice sessions.",
    image: "/instruments/drum-kit.png",
    pricePerDay: 35,
    pricePerWeek: 200,
    available: true,
    featured: true,
  },
  {
    id: "4",
    name: "Digital Keyboard",
    category: "Keys",
    description:
      "88-key weighted digital keyboard with hundreds of built-in sounds, recording capability, and MIDI support. Ideal for performances and production.",
    image: "/instruments/keyboard.png",
    pricePerDay: 25,
    pricePerWeek: 140,
    available: true,
    featured: true,
  },
  {
    id: "5",
    name: "Violin",
    category: "String",
    description:
      "Handcrafted violin with rich, warm sound. Comes with bow, rosin, and a protective carrying case. Great for orchestral and solo performances.",
    image: "/instruments/violin.png",
    pricePerDay: 18,
    pricePerWeek: 95,
    available: true,
    featured: false,
  },
  {
    id: "6",
    name: "Saxophone",
    category: "Wind",
    description:
      "Alto saxophone with a brilliant golden finish and smooth key action. Perfect for jazz, funk, and classical performances.",
    image: "/instruments/saxophone.png",
    pricePerDay: 22,
    pricePerWeek: 120,
    available: true,
    featured: false,
  },
];

// ─── Helper Functions ────────────────────────────────────────────────────────

/** Get all instruments */
export const getAllInstruments = (): Instrument[] => instruments;

/** Get only featured instruments (for home page) */
export const getFeaturedInstruments = (): Instrument[] =>
  instruments.filter((i) => i.featured);

/** Get a single instrument by ID */
export const getInstrumentById = (id: string): Instrument | undefined =>
  instruments.find((i) => i.id === id);

/** Get unique categories */
export const getCategories = (): string[] => [
  ...new Set(instruments.map((i) => i.category)),
];
