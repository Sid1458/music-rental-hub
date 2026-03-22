/**
 * Instrument Controller
 *
 * Handles request/response logic for instrument endpoints.
 */

const InstrumentModel = require("../models/instrumentModel");

// GET /api/instruments — return all instruments
const getAllInstruments = (req, res) => {
  try {
    const instruments = InstrumentModel.getAll();
    res.json(instruments);
  } catch (error) {
    console.error("Error fetching instruments:", error.message);
    res.status(500).json({ error: "Failed to fetch instruments" });
  }
};

// GET /api/instruments/:id — return a single instrument
const getInstrumentById = (req, res) => {
  try {
    const instrument = InstrumentModel.getById(req.params.id);

    if (!instrument) {
      return res.status(404).json({ error: "Instrument not found" });
    }

    res.json(instrument);
  } catch (error) {
    console.error("Error fetching instrument:", error.message);
    res.status(500).json({ error: "Failed to fetch instrument" });
  }
};

module.exports = { getAllInstruments, getInstrumentById };
