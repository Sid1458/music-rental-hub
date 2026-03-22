/**
 * Music Rental Hub — Express Server
 *
 * Entry point for the backend API.
 * Connects routes, middleware, and starts listening on port 5000.
 */

const express = require("express");
const cors = require("cors");

// Import routes
const instrumentRoutes = require("./routes/instrumentRoutes");
const bookingRoutes = require("./routes/bookingRoutes");
const userRoutes = require("./routes/userRoutes");

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 5000;

// ─── Middleware ───────────────────────────────────────────────────
app.use(cors());              // Enable CORS for frontend communication
app.use(express.json());      // Parse JSON request bodies

// ─── API Routes ──────────────────────────────────────────────────
app.use("/api/instruments", instrumentRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/users", userRoutes);

// ─── Health Check ────────────────────────────────────────────────
app.get("/", (req, res) => {
  res.json({
    message: "🎵 Music Rental Hub API is running!",
    endpoints: {
      instruments: "/api/instruments",
      bookings: "/api/bookings",
      users: "/api/users",
    },
  });
});

// ─── Start Server ────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`\n🎸 Music Rental Hub API running at http://localhost:${PORT}\n`);
});
