const express = require('express');
const router = express.Router();
const Package = require('../models/Package');
const { protect, admin } = require('../middleware/authMiddleware');

// Get all packages
router.get('/', async (req, res) => {
  const category = req.query.category;
  const query = category ? { category } : {};
  const packages = await Package.find(query);
  res.json(packages);
});

// Add package (Admin)
router.post('/', protect, admin, async (req, res) => {
  try {
    const newPackage = await Package.create(req.body);
    res.status(201).json(newPackage);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete package (Admin)
router.delete('/:id', protect, admin, async (req, res) => {
  try {
    await Package.findByIdAndDelete(req.params.id);
    res.json({ message: 'Package removed' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;