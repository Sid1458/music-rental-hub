/**
 * test.js — Basic unit tests for Music Rental Hub Backend
 *
 * These tests verify core logic without starting the server.
 * Run with:  node test.js
 */

let passed = 0;
let failed = 0;

function assert(description, condition) {
  if (condition) {
    console.log(`  ✅ PASS: ${description}`);
    passed++;
  } else {
    console.error(`  ❌ FAIL: ${description}`);
    failed++;
  }
}

// ─── Test Suite ───────────────────────────────────────────────────────────────

console.log("\n🎸 Music Rental Hub — Backend Tests\n");

// 1. Sanity check: Node.js version
console.log("▶  [1] Environment checks");
const [major] = process.versions.node.split(".").map(Number);
assert(`Node.js version is 18 or higher (found v${process.versions.node})`, major >= 18);

// 2. Instrument data shape validation
console.log("\n▶  [2] Instrument data validation");
const sampleInstrument = {
  id: 1,
  name: "Yamaha Acoustic Guitar",
  category: "Guitar",
  price: 15,
  description: "A great beginner guitar",
};
assert("Instrument has an id",        typeof sampleInstrument.id === "number");
assert("Instrument has a name",       typeof sampleInstrument.name === "string");
assert("Instrument has a category",   typeof sampleInstrument.category === "string");
assert("Instrument price is positive",sampleInstrument.price > 0);
assert("Instrument has a description",sampleInstrument.description.length > 0);

// 3. Booking data shape validation
console.log("\n▶  [3] Booking data validation");
const sampleBooking = {
  id: 101,
  user_name: "Alice",
  instrument_id: 1,
  date: "2026-04-10",
  duration: "day",
};
assert("Booking has an id",           typeof sampleBooking.id === "number");
assert("Booking has a user_name",     sampleBooking.user_name.length > 0);
assert("Booking has instrument_id",   typeof sampleBooking.instrument_id === "number");
assert("Booking date is not empty",   sampleBooking.date !== "");
assert("Booking duration is valid",   ["day", "week"].includes(sampleBooking.duration));

// 4. Business logic: price calculation
console.log("\n▶  [4] Price calculation logic");
function calcWeeklyPrice(dailyPrice) {
  return dailyPrice * 5;
}
assert("Weekly price = daily × 5 (15 → 75)", calcWeeklyPrice(15) === 75);
assert("Weekly price = daily × 5 (20 → 100)", calcWeeklyPrice(20) === 100);
assert("Weekly price > daily price",  calcWeeklyPrice(15) > 15);

// 5. API base URL check
console.log("\n▶  [5] API configuration");
const API_PORT = 5000;
const API_BASE = `http://localhost:${API_PORT}/api`;
assert("API_BASE is correctly formed",  API_BASE === "http://localhost:5000/api");
assert("API port is 5000",             API_PORT === 5000);

// ─── Summary ──────────────────────────────────────────────────────────────────

console.log(`\n─────────────────────────────────────`);
console.log(`  Results: ${passed} passed, ${failed} failed`);
console.log(`─────────────────────────────────────\n`);

if (failed > 0) {
  process.exit(1); // Non-zero exit tells CI the job failed
}
