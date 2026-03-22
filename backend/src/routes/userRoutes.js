/**
 * User Routes
 *
 * GET  /api/users → fetch all users
 * POST /api/users → create a new user
 */

const express = require("express");
const router = express.Router();
const { getAllUsers, createUser } = require("../controllers/userController");

router.get("/", getAllUsers);
router.post("/", createUser);

module.exports = router;
