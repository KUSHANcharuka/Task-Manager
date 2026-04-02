// backend/server.js
const express = require("express");
const cors = require("cors");
require("dotenv").config();
const connectDB = require("./db");

const app = express();
app.use(cors());
app.use(express.json());

// Ensure each request has a live DB connection (important on serverless cold starts).
app.use(async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (error) {
    console.error("MongoDB connection error:", error.message);
    res.status(500).json({ message: "Database connection failed" });
  }
});

const taskRoutes = require("./routes/taskRoutes");
app.use("/tasks", taskRoutes);

// Default route
app.get("/", (req, res) => {
  res.send("Backend is running");
});

const authRoutes = require("./routes/auth");
app.use("/api", authRoutes);

const PORT = process.env.PORT || 5000;

async function startServer() {
  try {
    await connectDB();
    console.log("MongoDB Connected");

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error.message);
    process.exit(1);
  }
}

if (process.env.VERCEL) {
  module.exports = app;
} else {
  startServer();
}
