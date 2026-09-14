const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, trim: true, lowercase: true },
  mobile: { type: String, required: true, trim: true },
  lastLogin: { type: Date, default: Date.now }
}, { timestamps: true }); // Automatically adds createdAt and updatedAt

module.exports = mongoose.model('User', userSchema);