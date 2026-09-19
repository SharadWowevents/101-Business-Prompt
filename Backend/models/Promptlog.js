const mongoose = require('mongoose');

const promptLogSchema = new mongoose.Schema({
  userName: { type: String, required: true },
  userEmail: { type: String, required: true },
  userMobile: { type: String },
  promptId: { type: String, required: true },
  promptTitle: { type: String, required: true },
  filledInputs: { type: mongoose.Schema.Types.Mixed }, // Stores { "describe business": "SaaS Platform", ... }
  copiedText: { type: String } // The final generated text they copied
}, { timestamps: true }); // Automatically adds 'createdAt' date

module.exports = mongoose.model('PromptLog', promptLogSchema);