const express = require("express");
const router = express.Router();
const z = require("zod");

const newQuestionModel = require("../../models/questionModel");

router.put('/updateQuestionById/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { questionText,options, correctAnswer, explanation, difficulty, quiz } = req.body;

    const updatedQuestion = await newQuestionModel.findByIdAndUpdate(
      id,
      { questionText,options, correctAnswer, explanation, difficulty, quiz },
      { new: true }
    );

    if (!updatedQuestion) {
      return res.status(404).json({ message: 'Question not found '+ id });
    }

    res.json({ message: 'Question updated successfully ', updatedQuestion });
  } catch (error) {
    res.status(500).json({ message: 'Error updating Question ' + req.params.id });
  }
});

module.exports = router;
