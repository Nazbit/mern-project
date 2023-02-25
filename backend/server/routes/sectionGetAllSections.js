const express = require('express');
const router = express.Router();
const newSectionModel = require('../models/sectionModel');

// Route to get all sections
router.get('/getAllSections', async (req, res) => {
  try {
    const sections = await newSectionModel.find();
    res.json(sections);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;