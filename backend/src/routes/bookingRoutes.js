/**
 * Booking Routes
 *
 * GET  /api/bookings → fetch all bookings
 * POST /api/bookings → create a new booking
 */

const express = require("express");
const router = express.Router();
const { getAllBookings, createBooking } = require("../controllers/bookingController");

router.get("/", getAllBookings);
router.post("/", createBooking);

module.exports = router;
