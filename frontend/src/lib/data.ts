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
  brand: string;
  description: string;
  image: string;
  pricePerDay: number;
  pricePerWeek: number;
  rating: number;
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
    brand: "Taylor",
    description:
      "Premium acoustic guitar with warm tones, perfect for unplugged sessions, campfires, and intimate performances. Features solid spruce top and mahogany body.",
    image: "/instruments/acoustic-guitar.png",
    pricePerDay: 15,
    pricePerWeek: 80,
    rating: 4.8,
    available: true,
    featured: true,
  },
  {
    id: "2",
    name: "Electric Guitar",
    category: "String",
    brand: "Fender",
    description:
      "Versatile electric guitar ideal for rock, blues, jazz, and everything in between. Comes with built-in pickups and a sleek metallic finish.",
    image: "/instruments/electric-guitar.png",
    pricePerDay: 20,
    pricePerWeek: 110,
    rating: 4.9,
    available: true,
    featured: true,
  },
  {
    id: "3",
    name: "Drum Kit",
    category: "Percussion",
    brand: "Pearl",
    description:
      "Professional 5-piece drum kit with cymbals, hi-hat, and all hardware included. Perfect for live gigs, studio recording, and practice sessions.",
    image: "/instruments/drum-kit.png",
    pricePerDay: 35,
    pricePerWeek: 200,
    rating: 4.7,
    available: true,
    featured: true,
  },
  {
    id: "4",
    name: "Digital Keyboard",
    category: "Keys",
    brand: "Yamaha",
    description:
      "88-key weighted digital keyboard with hundreds of built-in sounds, recording capability, and MIDI support. Ideal for performances and production.",
    image: "/instruments/keyboard.png",
    pricePerDay: 25,
    pricePerWeek: 140,
    rating: 4.6,
    available: true,
    featured: true,
  },
  {
    id: "5",
    name: "Violin",
    category: "String",
    brand: "Stradivarius",
    description:
      "Handcrafted violin with rich, warm sound. Comes with bow, rosin, and a protective carrying case. Great for orchestral and solo performances.",
    image: "/instruments/violin.png",
    pricePerDay: 18,
    pricePerWeek: 95,
    rating: 4.5,
    available: true,
    featured: false,
  },
  {
    id: "6",
    name: "Saxophone",
    category: "Wind",
    brand: "Selmer",
    description:
      "Alto saxophone with a brilliant golden finish and smooth key action. Perfect for jazz, funk, and classical performances.",
    image: "/instruments/saxophone.png",
    pricePerDay: 22,
    pricePerWeek: 120,
    rating: 4.7,
    available: true,
    featured: false,
  },
  {
    id: "7",
    name: "Bass Guitar",
    category: "String",
    brand: "Ibanez",
    description:
      "4-string bass guitar with deep, punchy low-end. Active pickups deliver crystal-clear tone for funk, rock, and jazz. Lightweight body for comfortable stage play.",
    image: "/instruments/electric-guitar.png",
    pricePerDay: 18,
    pricePerWeek: 100,
    rating: 4.6,
    available: true,
    featured: false,
  },
  {
    id: "8",
    name: "Concert Flute",
    category: "Wind",
    brand: "Gemeinhardt",
    description:
      "Silver-plated concert flute with smooth key action and brilliant projection. Perfect for orchestral, chamber, and solo performances. Comes with cleaning kit and case.",
    image: "/instruments/saxophone.png",
    pricePerDay: 14,
    pricePerWeek: 75,
    rating: 4.4,
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
