const Task = require("../model/taskModel");

const getAllTasks = async (req, res, next) => {
  let Tasks;

  try {
    tasks = await Task.find();
  } catch (err) {
    console.error(err);
  }
  if (!tasks) {
    return res.status(404).json({ message: "Tasks Not Found" });
  }
  return res.status(200).json({ tasks });
};

exports.getAllTasks = getAllTasks;
