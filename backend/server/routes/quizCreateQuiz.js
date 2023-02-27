const express = require("express");
const router = express.Router();
const newQuizModel = require('../models/quizModel')

router.post("/createQuiz", async (req, res) => { 
  const { title, explanation } = req.body

  const createNewQuiz = newQuizModel({
    title: title,
    explanation: explanation
  })
  
  const response = await newQuizModel.create(createNewQuiz)
  .then(course => res.json({ msg: 'Quiz created successfully' }))
  .catch(err => res.status(404).json({ error: 'Could not create quiz' }));
})

module.exports = router;