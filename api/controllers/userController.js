const User = require('../models/User');
const bcrypt = require('bcrypt');

// Get user by ID
exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    const { password, updatedAt, ...other } = user._doc; // Exclude sensitive data
    res.status(200).json(other);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching user' });
  }
};

// Get users by department
exports.getUsersByDepartment = async (req, res) => {
  try {
    const users = await User.find({ departement: req.params.name });
    if (!users.length) {
      return res.status(404).json({ error: 'No users found in this department' });
    }
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching users' });
  }
};

// Update user
exports.updateUser = async (req, res) => {
  if (req.body.userId === req.params.id || req.body.isAdmin) {
    if (req.body.password) {
      try {
        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(req.body.password, salt);
      } catch (err) {
        return res.status(500).json({ error: 'Error hashing password' });
      }
    }
    try {
      await User.findByIdAndUpdate(req.params.id, { $set: req.body });
      res.status(200).json("Account has been updated");
    } catch (err) {
      return res.status(500).json({ error: 'Error updating user' });
    }
  } else {
    return res.status(403).json("You can update only your account!");
  }
};

// Delete user
exports.deleteUser = async (req, res) => {
  if (req.body.userId === req.params.id || req.body.isAdmin) {
    try {
      await User.findByIdAndDelete(req.params.id);
      res.status(200).json("Account has been deleted");
    } catch (err) {
      return res.status(500).json({ error: 'Error deleting user' });
    }
  } else {
    return res.status(403).json("You can delete only your account!");
  }
};

// Get a user
exports.getUser = async (req, res) => {
  const userId = req.query.userId;
  const username = req.query.username;
  try {
    const user = userId
      ? await User.findById(userId)
      : await User.findOne({ username: username });
    const { password, updatedAt, ...other } = user._doc;
    res.status(200).json(other);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching user' });
  }
};

// Get friends
exports.getFriends = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    const friends = await Promise.all(
      user.followings.map((friendId) => User.findById(friendId))
    );
    const friendList = friends.map(({ _id, username, profilePicture }) => ({
      _id,
      username,
      profilePicture
    }));
    res.status(200).json(friendList);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching friends' });
  }
};

// Follow a user
exports.followUser = async (req, res) => {
  if (req.body.userId !== req.params.id) {
    try {
      const user = await User.findById(req.params.id);
      const currentUser = await User.findById(req.body.userId);
      if (!user.followers.includes(req.body.userId)) {
        await user.updateOne({ $push: { followers: req.body.userId } });
        await currentUser.updateOne({ $push: { followings: req.params.id } });
        res.status(200).json("User has been followed");
      } else {
        res.status(403).json("You already follow this user");
      }
    } catch (err) {
      res.status(500).json({ error: 'Error following user' });
    }
  } else {
    res.status(403).json("You can't follow yourself");
  }
};

// Unfollow a user
exports.unfollowUser = async (req, res) => {
  if (req.body.userId !== req.params.id) {
    try {
      const user = await User.findById(req.params.id);
      const currentUser = await User.findById(req.body.userId);
      if (user.followers.includes(req.body.userId)) {
        await user.updateOne({ $pull: { followers: req.body.userId } });
        await currentUser.updateOne({ $pull: { followings: req.params.id } });
        res.status(200).json("User has been unfollowed");
      } else {
        res.status(403).json("You don't follow this user");
      }
    } catch (err) {
      res.status(500).json({ error: 'Error unfollowing user' });
    }
  } else {
    res.status(403).json("You can't unfollow yourself");
  }
};
