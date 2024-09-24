const express = require('express');
const router = express.Router();
const {
  getUsersByDepartment,
  addTask,
  deleteTask,
  updateTask,
  updateTaskOwner
} = require('../controllers/teamtaskController');

// Get all users in a specific department
router.get('/users/:department', getUsersByDepartment);

// Add a new task
router.post('/add', addTask);

// Delete a task
router.delete('/delete/:id', deleteTask);

// Update a task
router.put('/update/:id', updateTask);

// Update task owner
router.put('/update-task-owner/:taskId', updateTaskOwner);

module.exports = router;
