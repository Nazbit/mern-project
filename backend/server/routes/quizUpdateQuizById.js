const express = require("express");
const router = express.Router();
const z = require("zod");

const newQuizModel = require("../models/quizModel");

router.put('/updateQuizById/:id', async (req, res) => {
  
  await newQuizModel.findByIdAndUpdate(req.params.id, req.body, {new: true})
      .then(updatedQuiz => {
        if (!updatedQuiz) {
          return res.status(404).json({ message: 'Quiz not found '+quizId  });
        }
        res.json({ message: 'Quiz updated successfully', updatedQuiz });
      })
      .catch(error => {
        res.status(500).json({ message: 'Error updating quiz'+quizId });
      });
  });

  module.exports = router;