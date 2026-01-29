const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema({
  task: String,
  description: String,
  date: String,
  startTime: String,
  endTime: String,
});

module.exports = mongoose.model("Task", TaskSchema);
