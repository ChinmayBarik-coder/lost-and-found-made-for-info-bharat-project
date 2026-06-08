const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  category: { type: String, enum: ['lost', 'found'], required: true },
  location: String,
  date: { type: Date, default: Date.now },
  contact: { type: String, required: true }
});

module.exports = mongoose.model('Item', itemSchema);
