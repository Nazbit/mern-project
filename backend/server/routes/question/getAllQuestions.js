const express = require('express');
const router = express.Router();
const newQuestionModel = require('../../models/questionModel');

// Route to get all questions
router.get('/getAllQuestions', async (req, res) => {
  try {
    const questions = await newQuestionModel.find();
    res.json(questions);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;