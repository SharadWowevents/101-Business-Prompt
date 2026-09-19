const mongoose = require('mongoose');

const promptLogSchema = new mongoose.Schema({
  userName: { type: String, required: true },
  userEmail: { type: String, required: true },
  userMobile: { type: String },
  promptId: { type: String, required: true },
  promptTitle: { type: String, required: true },
  originalTemplate: { type: String }, // Stores the template with brackets
  filledInputs: { type: mongoose.Schema.Types.Mixed }, // Stores user's custom inputs
  finalFilledPrompt: { type: String } // The finished text they copied
}, { timestamps: true });

module.exports = mongoose.model('PromptLog', promptLogSchema);