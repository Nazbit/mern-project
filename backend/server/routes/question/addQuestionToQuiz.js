const express = require("express");
const router = express.Router();
const Quiz = require("../../models/quizModel");
const Question = require("../../models/questionModel");

// POST route to add a Question to a quiz
router.post("/quizzes/:quizId/questions/:questionId", async (req, res) => {
  try {
    const quiz = await Quiz.findById(req.params.quizId);
    if (!quiz) {
      return res.status(404).send(`Quiz with ID ${req.params.quizId} not found`);
    }

    const question = await Question.findById(req.params.questionId);
    if (!question) {
      return res.status(404).send(`Question with ID ${req.params.questionId} not found`);
    }
    //Check if question is not already in quiz
    if (quiz.questions.includes(quiz._id)) {
      return res.status(400).send(`Question with ID ${req.params.questionId} already exists in quiz with ID ${req.params.quizId}`);
    }

    question.quiz = quiz._id; // Set the Question's quiz to the specified quiz's ID
    await question.save(); // Save the Question to the database

    quiz.questions.push(question._id); // Add the Question's ID to the quiz's courses array
    await quiz.save(); // Save the updated quiz to the database

    res.status(200).send(quiz);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

module.exports = router;
