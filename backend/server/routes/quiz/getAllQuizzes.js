const express = require('express');
const router = express.Router();
const newQuizModel = require('../../models/quizModel');

// Route to get all sections
router.get('/getAllQuizzes', async (req, res) => {
  try {
    const quizzes = await newQuizModel.find();
    res.json(quizzes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;