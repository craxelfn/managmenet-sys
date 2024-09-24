const Task = require('../models/Task');
const User = require('../models/User');

// Get users by department and their unconfirmed tasks
exports.getUsersByDepartment = async (req, res) => {
  try {
    const users = await User.find({ department: req.params.department });

    // Get unconfirmed tasks for users
    const userIds = users.map(user => user._id);
    const tasks = await Task.find({ 
      user: { $in: userIds }, 
      confirmed: false 
    });

    // Combine users and their tasks
    const usersWithTasks = users.map(user => ({
      ...user._doc,
      tasks: tasks.filter(task => task.user.toString() === user._id.toString())
    }));

    res.status(200).json(usersWithTasks);
  } catch (err) {
    console.error("Error fetching users and tasks:", err.message || err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Add a new task to a user
exports.addTask = async (req, res) => {
  const { title, description, dueDate, userId } = req.body;
  try {
    const task = new Task({ 
      title, 
      description, 
      dueDate, 
      user: userId,
      confirmed: false 
    });
    await task.save();

    res.status(201).json(task);
  } catch (err) {
    console.error("Error adding task:", err.message || err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Delete a task
exports.deleteTask = async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Task deleted successfully' });
  } catch (err) {
    console.error("Error deleting task:", err.message || err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Update a task
exports.updateTask = async (req, res) => {
  const { userId } = req.body;
  try {
    const task = await Task.findByIdAndUpdate(req.params.id, { user: userId }, { new: true });
    res.status(200).json(task);
  } catch (err) {
    console.error("Error updating task:", err.message || err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Update task owner
exports.updateTaskOwner = async (req, res) => {
  const { taskId } = req.params;
  const { newUserId } = req.body;

  try {
    // Find and update the task
    const task = await Task.findById(taskId);
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    task.user = newUserId;
    await task.save();

    res.status(200).json({ message: 'Task owner updated successfully', task });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};
