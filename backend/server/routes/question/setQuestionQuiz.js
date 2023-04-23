const express = require('express');
const router = express.Router();
const Quiz = require('../../models/Quiz');
const Question = require('../../models/Question');

// Update quiz with new question
router.put('/setQuestionQuiz/:quizId', async (req, res) => {
  const { quizId } = req.params;
  const { questionId } = req.body;

  try {
    const quiz = await Quiz.findById(quizId);
    const question = await Question.findById(questionId);

    if (!quiz || !question) {
      return res.status(404).json({ message: 'Quiz or question not found' });
    }

    quiz.questions.push(question);
    question.quiz = quiz;

    await quiz.save();
    await question.save();

    return res.status(200).json({ message: 'Question added to quiz' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
