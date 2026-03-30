const express = require("express");
const router = express.Router();
const Task = require("../models/Task");

router.post("/add", async (req, res) => {
  console.log("Received Payload:", req.body);

  try {
    const newTask = new Task(req.body);
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
    let filter = {};
    if (q) {
      filter = {
        $or: [
          { task: { $regex: q, $options: "i" } },
          { description: { $regex: q, $options: "i" } },
        ],
      };
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
    const tasks = await Task.find().sort({ date: 1, startTime: 1 });
    res.json(tasks);
  } catch (err) {
    console.error("Fetch error:", err);
    res.status(500).json({ error: err.message });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    if (!updatedTask) {
      return res.status(404).json({ error: "Task not found" });
    }

    res.json(updatedTask);
  } catch (err) {
    console.error("Update error:", err);
    res.status(500).json({ error: err.message });
  }
});

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
