const express = require("express");
const router = express.Router();
const Course = require("../models/courseModel");
const Quiz = require("../models/quizModel");

// DELETE route to remove a quiz from a course
router.delete("/courses/:courseId/Quizzes/:quizId", async (req, res) => {
  try {
    const course = await Course.findById(req.params.courseId);
    if (!course) {
      return res.status(404).send(`Course with ID ${req.params.courseId} not found`);
    }

    const quiz = await Quiz.findById(req.params.quizId);
    if (!quiz) {
      return res.status(404).send(`Quiz with ID ${req.params.quizId} not found`);
    }

    if (!course.quizzes.includes(quiz._id)) {
      return res.status(400).send(`Quiz with ID ${req.params.quizId} does not exist in course with ID ${req.params.courseId}`);
    }

    // Remove the quiz's ID from the course's courses array
    course.quizzes = course.quizzes.filter((quizId) => quizId.toString() !== quiz._id.toString());
    await course.save(); // Save the updated course to the database

    // Remove the course's ID from the quiz's course field
    quiz.course = null;
    await quiz.save(); // Save the updated quiz to the database

    res.status(200).send(course);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

module.exports = router;
