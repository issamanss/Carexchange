const bcrypt = require('bcryptjs');
const User = require('../models/User.module');
const generateToken = require('../utils/generateToken'); // Import token generator
const comparePasswords = require('../utils/comparePasswords');
const { validationResult } = require('express-validator');
// User Signup
const getLoginPage = (req, res) => {
  res.send('<h1>Login Page</h1>');
};


const signup = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { user_name, name, email, password, phoneNumber } = req.body;
    const existingUser = await User.findOne({ 
      $or: [{ email }, { user_name }] 
    });

    if (existingUser) {
      return res.status(400).json({ message: 'User with this email or username already exists' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      user_name,
      name,
      email,
      password: hashedPassword,
      phoneNumber
    });

    await newUser.save();

    res.status(201).json({ 
      message: 'User registered successfully!', 
      verified: false,
    });

  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};



const signin = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  
  try {
    const { user_name, password } = req.body;

    // Find user by username only
    const user = await User.findOne({ user_name });

    if (!user) {
      return res.status(400).json({ message: 'Invalid username or password' });
    }

    const isMatch = await comparePasswords(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    const token = await generateToken({ id: user._id, role: user.role });
    res.json({ message: 'Login successful', token });

  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = {
  getLoginPage,
  signup,
  signin
};
