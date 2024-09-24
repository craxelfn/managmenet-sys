const User = require('../models/User');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: '3d' });
};

// Login user
const loginUser = async (req, res) => {
  const { email, password: userPassword } = req.body; 
  try {
    const user = await User.login(email, userPassword);
    const token = createToken(user._id);

    const { password: hashedPassword, ...userData } = user._doc;

    res.status(200).json({ ...userData, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};




// Signup user
const signupUser = async (req, res) => {
  const { username, email, password, phone, ecole, typeStage, typeContrat, department, role, encadrant, dure, bureau ,salaire } = req.body;
  try {
    const user = await User.signup(username, email, password, phone, ecole, typeStage, typeContrat, department, role, encadrant, dure, bureau ,salaire);
    // Create a token
    const token = createToken(user._id);

    // Respond with user data directly, not nested under 'user'
    res.status(200).json({ _id: user._id, email: user.email, username: user.username, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


module.exports = { signupUser, loginUser };
