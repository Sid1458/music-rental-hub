/**
 * Instrument Routes
 *
 * GET /api/instruments     → fetch all instruments
 * GET /api/instruments/:id → fetch a single instrument
 */

const express = require("express");
const router = express.Router();
const { getAllInstruments, getInstrumentById } = require("../controllers/instrumentController");

router.get("/", getAllInstruments);
router.get("/:id", getInstrumentById);

module.exports = router;
