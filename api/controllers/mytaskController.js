const Task = require("../models/Task");

// Get tasks for a specific user
exports.getTasksByUserId = async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.params.userId }).exec();

    if (!tasks.length) return res.status(404).json("No tasks found for this user");

    res.status(200).json(tasks);
  } catch (err) {
    console.error("Error fetching tasks:", err.message || err);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.getTaskById = async (req, res) => {
  try {
    const task = await Task.findById(req.params.taskId).populate('user', 'username'); // Optionally populate user data
    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }
    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

// Mark a task as completed
exports.completeTask = async (req, res) => {
  try {
    const updatedTask = await Task.findByIdAndUpdate(
      req.params.taskId,
      { status: 'Completed' },
      { new: true }
    );

    if (!updatedTask) return res.status(404).json("Task not found");

    res.status(200).json(updatedTask);
  } catch (err) {
    console.error("Error updating task status:", err.message || err);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Mark a task as in progress
exports.seenTask = async (req, res) => {
  try {
    const updatedTask = await Task.findByIdAndUpdate(
      req.params.taskId,
      { status: 'In Progress' },
      { new: true }
    );

    if (!updatedTask) return res.status(404).json("Task not found");

    res.status(200).json(updatedTask);
  } catch (err) {
    console.error("Error updating task status:", err.message || err);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Delete a task
exports.deleteTask = async (req, res) => {
  try {
    const deletedTask = await Task.findByIdAndDelete(req.params.taskId);

    if (!deletedTask) return res.status(404).json("Task not found");

    res.status(200).json("Task deleted successfully");
  } catch (err) {
    console.error("Error deleting task:", err.message || err);
    res.status(500).json({ error: "Internal server error" });
  }
};
