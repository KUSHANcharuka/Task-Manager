// backend/server.js
const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const cors = require("cors");
require("dotenv").config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.options("*", cors());

// MongoDB Connect
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error("MongoDB Error:", err));

const taskRoutes = require("./routes/taskRoutes");
app.use("/tasks", taskRoutes);

// Default route
app.get("/", (req, res) => {
  res.send("Backend is running");
});

const users = [];

// signup route
const auth = require("./routes/auth");
app.use("/api", auth);

// login route
const authRoutes = require("./routes/auth");
app.use("/api", authRoutes);

//port
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });
