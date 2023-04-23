const express = require("express");
const router = express.Router();
const Quiz = require("../../models/quizModel");
const Question = require("../../models/questionModel");

// DELETE route to remove a question from a quiz
router.delete("/quizzes/:quizId/questions/:questionId", async (req, res) => {
  try {
    const quiz = await Quiz.findById(req.params.quizId);
    if (!quiz) {
      return res.status(404).send(`Quiz with ID ${req.params.quizId} not found`);
    }

    const question = await Question.findById(req.params.questionId);
    if (!question) {
      return res.status(404).send(`Question with ID ${req.params.questionId} not found`);
    }

    if (!quiz.quizzes.includes(question._id)) {
      return res.status(400).send(`Question with ID ${req.params.questionId} does not exist in quiz with ID ${req.params.quizId}`);
    }

    // Remove the question's ID from the quiz's  array
    quiz.quizzes = quiz.quizzes.filter((questionId) => questionId.toString() !== question._id.toString());
    await quiz.save(); // Save the updated quiz to the database

    // Remove the quiz's ID from the question's quiz field
    question.questions = question.questions.filter((quizId) => quizId.toString() !== quiz._id.toString());
    await question.save(); // Save the updated question to the database

    res.status(200).send(quiz);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

module.exports = router;