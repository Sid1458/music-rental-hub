/**
 * User Controller
 *
 * Handles request/response logic for user endpoints.
 */

const UserModel = require("../models/userModel");

// GET /api/users — return all users
const getAllUsers = (req, res) => {
  try {
    const users = UserModel.getAll();
    res.json(users);
  } catch (error) {
    console.error("Error fetching users:", error.message);
    res.status(500).json({ error: "Failed to fetch users" });
  }
};

// POST /api/users — create a new user
const createUser = (req, res) => {
  try {
    const { name } = req.body;

    if (!name || name.trim() === "") {
      return res.status(400).json({ error: "Name is required" });
    }

    const user = UserModel.create(name.trim());
    res.status(201).json(user);
  } catch (error) {
    console.error("Error creating user:", error.message);
    res.status(500).json({ error: "Failed to create user" });
  }
};

module.exports = { getAllUsers, createUser };
