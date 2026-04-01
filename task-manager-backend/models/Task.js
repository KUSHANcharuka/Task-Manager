const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  task: String,
  description: String,
  date: String,
  startTime: String,
  endTime: String,
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Task", TaskSchema);
