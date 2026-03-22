/**
 * Booking Model
 *
 * Database queries related to bookings.
 */

const db = require("./db");

// Fetch all bookings (with instrument name via JOIN)
const getAll = () => {
  return db
    .prepare(
      `SELECT bookings.*, instruments.name AS instrument_name
       FROM bookings
       JOIN instruments ON bookings.instrument_id = instruments.id
       ORDER BY bookings.id DESC`
    )
    .all();
};

// Create a new booking
const create = ({ user_name, instrument_id, date, duration }) => {
  const result = db
    .prepare(
      "INSERT INTO bookings (user_name, instrument_id, date, duration) VALUES (?, ?, ?, ?)"
    )
    .run(user_name, instrument_id, date, duration);

  return { id: result.lastInsertRowid, user_name, instrument_id, date, duration };
};

module.exports = { getAll, create };
