// app.js
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/database');
const authRoutes = require('./routes/authRoutes');
const textRoutes = require('./routes/textRoutes'); // Import text routes

// Load environment variables
dotenv.config();

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json()); // Parse incoming JSON bodies

// Routes
app.use('/api/auth', authRoutes);  // Authentication routes
app.use('/api', textRoutes);       // Store/Retrieve text routes

// Start the server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Express server running on port ${PORT}`);
});
