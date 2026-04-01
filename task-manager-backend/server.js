// backend/server.js
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

// Middleware
app.use(
  cors({
    origin: "*",
    credentials: false,
  }),
);
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
