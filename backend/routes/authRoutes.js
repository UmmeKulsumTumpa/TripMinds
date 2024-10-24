// routes/authRoutes.js

const express = require('express');
const { signup, signin } = require('../controllers/authController');
const { authenticateToken } = require('../middlewares/auth');

const router = express.Router();

// Signup route
router.post('/signup', signup);

// Signin route
router.post('/signin', signin);

// Protected route example
router.get('/protected', authenticateToken, (req, res) => {
  res.json({ message: `Hello ${req.user.username}, you have access to this route` });
});

module.exports = router;
