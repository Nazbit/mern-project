const express = require("express");
const router = express.Router();
const User = require('../../models/userModel');
const Question = require('../../models/questionModel');
const Quiz = require('../../models/quizModel');

router.post('/submitQuiz', async (req, res) => {
  const quizId = req.body.quizId;
  const userAnswers = req.body.userAnswers;
  const userId = req.body.userId;

  try {
    // find the quiz
    const quiz = await Quiz.findById(quizId);

    // calculate the score
    let score = 0;
    for (let i = 0; i < userAnswers.length; i++) {
      const questionId = userAnswers[i].questionId;
      const answer = userAnswers[i].answer;

      // find the question
      const question = await Question.findById(questionId);

      // check if the answer is correct
      if (answer === question.correctAnswer) {
        score++;
      }
    }

    // update the user's quiz score
    const user = await User.findById(userId);
    user.quizScores.push({ quizId: quizId, score: score });
    await user.save();

    res.status(200).json({ score: score });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
