const express = require("express");
const router = express.Router();
const Task = require("../models/Task");
const authenticateToken = require("../middleware/authMiddleware");

router.use(authenticateToken);

router.post("/add", async (req, res) => {
  console.log("Received Payload:", req.body);

  try {
    const newTask = new Task({ ...req.body, userId: req.user.userId });
    const savedTask = await newTask.save();
    res.status(201).json(savedTask);
  } catch (err) {
    console.error("Save error:", err);
    res.status(500).json({ error: err.message });
  }
});

router.get("/search", async (req, res) => {
  try {
    const { q } = req.query;

    let filter = { userId: req.user.userId };
    if (q) {
      filter.$or = [
        { task: { $regex: q, $options: "i" } },
        { description: { $regex: q, $options: "i" } },
      ];
    }

    const tasks = await Task.find(filter).sort({ date: 1, startTime: 1 });
    res.json(tasks);
  } catch (err) {
    console.error("Fetch error:", err);
    res.status(500).json({ error: err.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const tasks = await Task.find({ userId: req.user.userId }).sort({
      date: 1,
      startTime: 1,
    });
    res.json(tasks);
  } catch (err) {
    console.error("Fetch error:", err);
    res.status(500).json({ error: err.message });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }

    if (task.userId.toString() !== req.user.userId) {
      return res
        .status(403)
        .json({ error: "Unauthorized to update this task" });
    }

    const updatedTask = await Task.findByIdAndUpdate(
      req.params.id,
      { ...req.body, userId: req.user.userId },
      {
        new: true,
      },
    );

    res.json(updatedTask);
  } catch (err) {
    console.error("Update error:", err);
    res.status(500).json({ error: err.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }

    if (task.userId.toString() !== req.user.userId) {
      return res
        .status(403)
        .json({ error: "Unauthorized to delete this task" });
    }

    const deleted = await Task.findByIdAndDelete(req.params.id);
    res.json({ message: "Task deleted successfully" });
  } catch (err) {
    console.error("Delete error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
