// User.js — Defines the Mongoose User schema and exports the model
const mongoose = require("mongoose");

// Define the schema structure
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true },
  age: Number,
});

// Create and export the model
module.exports = mongoose.model("User", userSchema);
