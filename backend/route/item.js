const express = require('express');
const router = express.Router();
const Item = require('../models/Item');

// Add new item
router.post('/', async (req, res) => {
  try {
    const item = new Item(req.body);
    await item.save();
    res.status(201).json(item);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get all items
router.get('/', async (req, res) => {
  try {
    const items = await Item.find();
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get items by category
router.get('/:category', async (req, res) => {
  try {
    const items = await Item.find({ category: req.params.category });
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
