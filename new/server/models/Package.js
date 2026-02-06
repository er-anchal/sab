const mongoose = require('mongoose');

const packageSchema = new mongoose.Schema({
  title: { type: String, required: true },
  price: { type: String, required: true },
  image: { type: String, required: true },
  category: { type: String, required: true }, // 'international', 'india', 'honeymoon'
  duration: { type: String },
  location: { type: String },
}, { timestamps: true });

module.exports = mongoose.model('Package', packageSchema);