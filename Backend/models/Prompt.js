const mongoose = require('mongoose');

const promptSchema = new mongoose.Schema({
  number: { type: Number, required: true, unique: true },
  category: { 
    type: String, 
    required: true,
    enum: ['Marketing', 'Sales', 'Delivery', 'Finance', 'People', 'AI'] 
  },
  title: { type: String, required: true },
  prompt: { type: String, required: true }
}, { timestamps: true });

// Transforms MongoDB's _id to id for the frontend
promptSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret._id;
  }
});

module.exports = mongoose.model('Prompt', promptSchema);