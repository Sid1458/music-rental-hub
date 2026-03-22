/**
 * Booking Controller
 *
 * Handles request/response logic for booking endpoints.
 */

const BookingModel = require("../models/bookingModel");
const InstrumentModel = require("../models/instrumentModel");

// GET /api/bookings — return all bookings
const getAllBookings = (req, res) => {
  try {
    const bookings = BookingModel.getAll();
    res.json(bookings);
  } catch (error) {
    console.error("Error fetching bookings:", error.message);
    res.status(500).json({ error: "Failed to fetch bookings" });
  }
};

// POST /api/bookings — create a new booking
const createBooking = (req, res) => {
  try {
    const { user_name, instrument_id, date, duration } = req.body;

    // Basic validation
    if (!user_name || !instrument_id || !date || !duration) {
      return res.status(400).json({ error: "All fields are required: user_name, instrument_id, date, duration" });
    }

    if (!["day", "week"].includes(duration)) {
      return res.status(400).json({ error: "Duration must be 'day' or 'week'" });
    }

    // Check that the instrument exists
    const instrument = InstrumentModel.getById(instrument_id);
    if (!instrument) {
      return res.status(404).json({ error: "Instrument not found" });
    }

    const booking = BookingModel.create({ user_name, instrument_id, date, duration });
    res.status(201).json(booking);
  } catch (error) {
    console.error("Error creating booking:", error.message);
    res.status(500).json({ error: "Failed to create booking" });
  }
};

module.exports = { getAllBookings, createBooking };
