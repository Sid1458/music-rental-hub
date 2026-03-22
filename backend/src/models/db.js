/**
 * Database Setup — SQLite using better-sqlite3
 *
 * Creates the database file and initializes tables if they don't exist.
 * Uses better-sqlite3 for synchronous, simple, and fast SQLite access.
 */

const Database = require("better-sqlite3");
const path = require("path");

// Create (or open) the database file in the backend root
const dbPath = path.join(__dirname, "..", "..", "database.db");
const db = new Database(dbPath);

// Enable WAL mode for better performance
db.pragma("journal_mode = WAL");

// ─── Create Tables ───────────────────────────────────────────────

db.exec(`
  CREATE TABLE IF NOT EXISTS instruments (
    id    INTEGER PRIMARY KEY AUTOINCREMENT,
    name  TEXT NOT NULL,
    price REAL NOT NULL,
    category    TEXT NOT NULL,
    description TEXT
  );
`);

db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id   INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL
  );
`);

db.exec(`
  CREATE TABLE IF NOT EXISTS bookings (
    id            INTEGER PRIMARY KEY AUTOINCREMENT,
    user_name     TEXT    NOT NULL,
    instrument_id INTEGER NOT NULL,
    date          TEXT    NOT NULL,
    duration      TEXT    NOT NULL CHECK(duration IN ('day', 'week')),
    FOREIGN KEY (instrument_id) REFERENCES instruments(id)
  );
`);

// ─── Seed sample instruments if the table is empty ───────────────

const count = db.prepare("SELECT COUNT(*) AS cnt FROM instruments").get();

if (count.cnt === 0) {
  const insert = db.prepare(
    "INSERT INTO instruments (name, price, category, description) VALUES (?, ?, ?, ?)"
  );

  const seedData = [
    ["Yamaha Acoustic Guitar", 15, "Guitar", "A warm-toned acoustic guitar, perfect for beginners and campfire jams."],
    ["Fender Stratocaster", 25, "Guitar", "Iconic electric guitar known for its bright, cutting tone."],
    ["Gibson Les Paul", 30, "Guitar", "A legendary electric guitar with rich, full-bodied sound."],
    ["Pearl Export Drum Kit", 40, "Drums", "5-piece drum kit ideal for rock, pop, and jazz performances."],
    ["Roland TD-17 Electronic Drums", 35, "Drums", "Compact electronic drum kit with realistic feel and silent practice mode."],
    ["Yamaha PSR-E373 Keyboard", 12, "Keyboard", "61-key portable keyboard with built-in lessons and hundreds of voices."],
    ["Casio CT-X700 Keyboard", 10, "Keyboard", "Affordable keyboard with AiX sound source for rich tones."],
    ["Korg B2 Digital Piano", 20, "Piano", "88-key digital piano with weighted keys and natural grand sound."],
    ["Fender Jazz Bass", 22, "Bass", "Smooth and versatile bass guitar, a studio and stage classic."],
    ["Yamaha YFL-222 Flute", 18, "Wind", "Student-level flute with clear, bright tone and easy playability."],
    ["Shure SM58 Microphone", 8, "Accessories", "Industry-standard dynamic vocal microphone for live performances."],
    ["Boss Katana 50 Amplifier", 15, "Accessories", "Versatile 50-watt guitar amplifier with built-in effects."],
  ];

  const insertMany = db.transaction((items) => {
    for (const item of items) {
      insert.run(...item);
    }
  });

  insertMany(seedData);
  console.log("✅ Seeded 12 sample instruments into the database.");
}

module.exports = db;
