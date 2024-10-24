// controllers/authController.js

const User = require('../models/User');
const { hashPassword, verifyPassword } = require('../utils/hashUtils');
const jwt = require('jsonwebtoken');

// Signup logic
const signup = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // Check if email is already registered
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already registered' });
    }

    // Hash the password and create a new user
    const hashedPassword = await hashPassword(password);
    const user = new User({ username, email, password: hashedPassword });

    // Save user to database
    await user.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Signin logic
const signin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    const isPasswordValid = await verifyPassword(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    const token = jwt.sign(
      { id: user._id, username: user.username },
       process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.json({ token, message: 'Signin successful' });
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

module.exports = { signup, signin };
