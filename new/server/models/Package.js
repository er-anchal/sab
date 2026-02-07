const mongoose = require('mongoose');

// Schema for individual itinerary days
const daySchema = new mongoose.Schema({
  day: { type: Number, required: true },
  title: { type: String, required: true },
  desc: { type: String, required: true }, 
});

// Schema for policy sections
const policySchema = new mongoose.Schema({
  title: { type: String, required: true },
  rules: [{ type: String }]
});

const packageSchema = new mongoose.Schema({
  // Core Info
  title: { type: String, required: true },
  category: { type: String, required: true }, // 'international', 'india', 'honeymoon', 'deal'
  location: { type: String, required: true },
  duration: { type: String, required: true }, // e.g., "5 Days / 4 Nights"
  
  // Pricing & Rating
  price: { type: String, required: true },    // String to allow formatting like "Starts Rs. 25,000/-"
  numericPrice: { type: Number },             // Optional: for sorting calculations later
  rating: { type: Number, default: 4.5 },
  reviews: { type: Number, default: 0 },

  // Visuals
  image: { type: String, required: true },    // Main Thumbnail
  gallery: [{ type: String }],                // Array of additional image URLs

  // Detailed Content
  description: { type: String },
  inclusions: [{ type: String }],
  exclusions: [{ type: String }],
  itinerary: [daySchema],                     // The day-by-day breakdown
  policies: [policySchema],                   // Cancellation/Payment terms

  isFeatured: { type: Boolean, default: false },
}, { timestamps: true });

module.exports = mongoose.model('Package', packageSchema);