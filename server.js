// server.js — Main entry point: sets up Express server and API routes

const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const User = require("./models/User");

// Load .env variables
dotenv.config();

// Connect to MongoDB
connectDB();

// Initialize Express
const app = express();
app.use(express.json()); // Parses incoming JSON

// ➤ GET: Return all users
app.get("/users", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ➤ POST: Add a new user to the database
app.post("/users", async (req, res) => {
  try {
    const newUser = await User.create(req.body);
    res.status(201).json(newUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// ➤ PUT: Edit a user by ID
app.put("/users/:id", async (req, res) => {
  try {
    const updated = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(updated);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
});

// ➤ DELETE: Remove a user by ID
app.delete("/users/:id", async (req, res) => {
  try {
    const deleted = await User.findByIdAndDelete(req.params.id);
    res.json({ message: "User deleted", deleted });
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
