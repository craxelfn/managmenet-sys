const express = require('express');
const router = express.Router();
const {
  updateUser,
  deleteUser,
  getUser,
  getFriends,
  followUser,
  unfollowUser,
  getUserById,
  getUsersByDepartment
} = require('../controllers/userController');

// Update user
router.put('/:id', updateUser);

// Delete user
router.delete('/:id', deleteUser);
// get user by id 
router.get('/:id', getUserById);
router.get('department/:name', getUsersByDepartment);
// Get a user
router.get('/', getUser);

// Get friends
router.get('/friends/:userId', getFriends);

// Follow a user
router.put('/:id/follow', followUser);

// Unfollow a user
router.put('/:id/unfollow', unfollowUser);

module.exports = router;
