const mongoose = require('mongoose');

const daySchema = new mongoose.Schema({
  day: { type: Number, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  meals: { type: String } // e.g., "Breakfast & Dinner"
});

const packageSchema = new mongoose.Schema({
  title: { type: String, required: true },
  price: { type: Number, required: true }, // Changed to Number for calculations
  discountPrice: { type: Number },
  images: [{ type: String }], // Array of image URLs
  category: { type: String, required: true }, // 'international', 'india', 'honeymoon'
  location: { type: String },
  duration: { type: String }, // e.g., "5N/6D"
  description: { type: String }, // Short overview
  inclusions: [{ type: String }],
  exclusions: [{ type: String }],
  itinerary: [daySchema], // The day-by-day breakdown
  isFeatured: { type: Boolean, default: false },
}, { timestamps: true });

module.exports = mongoose.model('Package', packageSchema);