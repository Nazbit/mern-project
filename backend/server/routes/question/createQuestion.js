const express = require("express");
const router = express.Router();
const newQuestionModel = require('../../models/questionModel')

router.post("/createQuestion", async (req, res) => { 
  const { questionText, options, correctAnswer, explanation } = req.body

  const createNewQuestion = newQuestionModel({
    questionText: questionText,
    options: options,
    correctAnswer:correctAnswer,
    explanation : explanation
  })
  
  const question = await newQuestionModel.create(createNewQuestion)
  .catch(err => res.status(404).json({ error: 'Could not create Question' }));

  res.json({ msg: 'Question created successfully', questionId: question._id });
})

module.exports = router;
