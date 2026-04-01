// backend/server.js
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

// Middleware
const allowedOrigins = [
  "http://localhost:5173",
  "https://task-manager-back-theta.vercel.app",
];

const corsOptions = {
  origin(origin, callback) {
    // Allow tools like Postman/cURL that may not send an Origin header.
    if (!origin) {
      return callback(null, true);
    }

    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    }

    return callback(new Error("Not allowed by CORS"));
  },
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: false,
};

app.use(cors(corsOptions));
app.options(/.*/, cors(corsOptions));
app.use(express.json());

// MongoDB Connect
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error("MongoDB Error:", err));

const taskRoutes = require("./routes/taskRoutes");
app.use("/tasks", taskRoutes);

// Default route
app.get("/", (req, res) => {
  res.send("Backend is running");
});

const auth = require("./routes/auth");
app.use("/api", auth);

const PORT = process.env.PORT || 5000;

// Start a local server only outside Vercel serverless runtime.
if (!process.env.VERCEL) {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

module.exports = app;
