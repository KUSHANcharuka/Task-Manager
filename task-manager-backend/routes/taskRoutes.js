const express = require("express");
const router = express.Router();
const Task = require("../models/Task");

// 1. Create Task
router.post("/add", async (req, res) => {
  console.log("Received Payload:", req.body);

  try {
    const newTask = new Task(req.body);
    const savedTask = await newTask.save();
    res.status(201).json(savedTask); // Return the saved task including _id
  } catch (err) {
    console.error("Save error:", err);
    res.status(500).json({ error: err.message });
  }
});

// 1. Search Tasks

router.get("/search", async (req, res) => {
  try {
    const { title, status, date } = req.query; // Extract query parameters
    const filter = {};

    // Add filters dynamically based on query parameters
    if (title) filter.title = { $regex: title, $options: "i" }; // Case-insensitive search
    if (status) filter.status = status;
    if (date) filter.date = date;

    // Fetch tasks based on filters
    const tasks = await Task.find(filter).sort({ date: 1, startTime: 1 });
    res.json(tasks);
  } catch (err) {
    console.error("Search error:", err);
    res.status(500).json({ error: err.message });
  }
});

// 2. Get All Tasks
router.get("/", async (req, res) => {
  try {
    // Sort by date (optional, but good for UI)
    const tasks = await Task.find().sort({ date: 1, startTime: 1 });
    res.json(tasks);
  } catch (err) {
    console.error("Fetch error:", err);
    res.status(500).json({ error: err.message });
  }
});

// 3. Update Task (NEW - Required for Edit functionality)
router.put("/:id", async (req, res) => {
  try {
    const updatedTask = await Task.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true } // Returns the updated document instead of the old one
    );

    if (!updatedTask) {
      return res.status(404).json({ error: "Task not found" });
    }

    res.json(updatedTask);
  } catch (err) {
    console.error("Update error:", err);
    res.status(500).json({ error: err.message });
  }
});

// 4. Delete Task
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await Task.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ error: "Task not found" });
    }
    res.json({ message: "Task deleted successfully" });
  } catch (err) {
    console.error("Delete error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
