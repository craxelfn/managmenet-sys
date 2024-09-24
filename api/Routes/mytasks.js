const router = require("express").Router();
const {
  getTasksByUserId,
  completeTask,
  seenTask,
  deleteTask,
  getTaskById
} = require("../controllers/mytaskController");

// Get tasks for a specific user
router.get("/user/:userId", getTasksByUserId);

// Get task by ID
router.get("/task/:taskId", getTaskById);

// Mark a task as completed
router.post("/:taskId/complete", completeTask);

// Mark a task as in progress
router.post("/:taskId/seen", seenTask);

// Delete a task
router.delete("/:taskId", deleteTask);

module.exports = router;
