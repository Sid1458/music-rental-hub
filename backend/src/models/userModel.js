/**
 * User Model
 *
 * Database queries related to users.
 */

const db = require("./db");

// Fetch all users
const getAll = () => {
  return db.prepare("SELECT * FROM users").all();
};

// Create a new user
const create = (name) => {
  const result = db.prepare("INSERT INTO users (name) VALUES (?)").run(name);
  return { id: result.lastInsertRowid, name };
};

module.exports = { getAll, create };
