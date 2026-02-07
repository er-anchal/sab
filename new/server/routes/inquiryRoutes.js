const express = require('express');
const router = express.Router();
const Inquiry = require('../models/Inquiry');
const { protect, admin } = require('../middleware/authMiddleware');

// POST /api/inquiries (Public - For your Contact Form)
router.post('/', async (req, res) => {
  try {
    const { name, email, phone, message } = req.body;
    const newInquiry = await Inquiry.create({ name, email, phone, message });
    res.status(201).json({ message: 'Inquiry sent successfully!' });
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
});

// GET /api/inquiries (Admin Only - To view messages)
router.get('/', protect, admin, async (req, res) => {
  try {
    const inquiries = await Inquiry.find().sort({ createdAt: -1 });
    res.json(inquiries);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
});

module.exports = router;