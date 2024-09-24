// models/User.js
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const validator = require('validator');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    require: true,
    min: 3,
    max: 20,
    unique: true,
  },
  phone: {
    type: String,
    required: false
  },
  email: {
    type: String,
    required: true,
    max: 50,
    unique: true,
  },
  salaire: {
    type: Number,
    default: 0
  },
  typeContrat: {
    type: String,
    default: 'cdi'
  },
  department: {
    type: String,
    required: false
  },
  role: {
    type: String,
    default: 'worker'
  },
  car: {
    type: String,
    default: 'none'
  },
  bureau: {
    type: String,
    default: 'none'
  },
  photoDeProfile: {
    type: String,
    required: false 
  },
  password: {
    type: String,
    required: true,
    min: 6,
  },
  type: {
    type: Boolean,
    required: false,
    default: false 
  },
  completedTasks: {
    type: Number,
    default: 0,
  },
  reports: {
    type: Number,
    default: 0,
  },
  ecole: {
    type: String,
    required: false ,
    default: "none"
  },
  encadrant: { 
    type: String, 
    required: false 
  },
  dure: { 
    type: String, 
    required: false 
  },
  typeStage: { 
    type: String, 
    required: false 
  },
});

// static signup method 
userSchema.statics.signup = async function(username, email, password, phone, ecole, typeStage, typeContrat, department, role, encadrant, dure, bureau ,salaire) { 
  // Validation 
  if (!email || !password || !username) { 
    throw Error('All fields must be filled');
  }
  
  if (!validator.isEmail(email)) {
    throw Error('Email is not valid');
  }
  
  if (!validator.isStrongPassword(password)) {
    throw Error('Password not strong enough');
  }
  
  const usernameWords = username.trim().split(/\s+/); 
  if (usernameWords.length !== 2) {
    throw Error('Enter correct name');
  }

  const exists = await this.findOne({ email });
  if (exists) {
    throw Error('Email already in use');
  }

  // Hash the password
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  const user = await this.create({ password: hash  , username, email, phone, ecole, typeStage, typeContrat, department, role, encadrant, dure, bureau ,salaire});

  return user;
};

// static login method
userSchema.statics.login = async function (email, password) {
  if (!email || !password) {
    throw Error('All fields must be filled');
  }
  const user = await this.findOne({ email });
  if (!user) {
    throw Error('Incorrect email');
  }
  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    throw Error('Incorrect password');
  }

  // Remove password from the user object before returning it
  user.password = undefined;
  return user;
};

module.exports = mongoose.model('User', userSchema);
