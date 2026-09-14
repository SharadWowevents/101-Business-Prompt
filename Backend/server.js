const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const User = require('./models/User');
const Prompt = require('./models/Prompt');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('✅ MongoDB Connected'))
  .catch(err => console.error('❌ MongoDB Connection Error:', err));

// ==========================================
// ROUTES
// ==========================================

/**
 * @route   POST /api/users/login
 * @desc    Capture lead data or update existing user
 */
app.post('/api/users/login', async (req, res) => {

    console.log('req.body');
  try {
    const { name, email, mobile } = req.body;

    if (!name || !email || !mobile) {
      return res.status(400).json({ message: 'All fields are required.' });
    }

    // Find existing user or create a new lead
    let user = await User.findOne({ email });
    
    if (user) {
      user.lastLogin = Date.now();
      // Update name/mobile if they changed
      user.name = name; 
      user.mobile = mobile;
      await user.save();
    } else {
      user = new User({ name, email, mobile });
      await user.save();
    }

    res.status(200).json({ message: 'Access granted', user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error processing login.' });
  }
});

/**
 * @route   GET /api/prompts
 * @desc    Fetch all prompts for the library
 */
app.get('/api/prompts', async (req, res) => {
  try {
    const prompts = await Prompt.find().sort({ number: 1 });
    res.status(200).json(prompts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error fetching prompts.' });
  }
});

/**
 * @route   POST /api/prompts
 * @desc    Admin route to add a new prompt to the DB
 */
app.post('/api/prompts', async (req, res) => {
  try {
    const newPrompt = new Prompt(req.body);
    const savedPrompt = await newPrompt.save();
    res.status(201).json(savedPrompt);
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: 'Error saving prompt.', error });
  }
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));