/**
 * Instrument Model
 *
 * Database queries related to instruments.
 */

const db = require("./db");

// Fetch all instruments
const getAll = () => {
  return db.prepare("SELECT * FROM instruments").all();
};

// Fetch a single instrument by ID
const getById = (id) => {
  return db.prepare("SELECT * FROM instruments WHERE id = ?").get(id);
};

module.exports = { getAll, getById };
