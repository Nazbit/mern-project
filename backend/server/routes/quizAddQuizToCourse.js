const express = require("express");
const router = express.Router();
const Course = require("../models/courseModel");
const Quiz = require("../models/quizModel");

// POST route to add a quiz to a course
router.post("/courses/:courseId/quizzes/:quizId", async (req, res) => {
  try {
    const course = await Course.findById(req.params.courseId);
    if (!course) {
      return res.status(404).send(`Course with ID ${req.params.courseId} not found`);
    }
    
    const quiz = await Quiz.findById(req.params.quizId);
    if (!quiz) {
      return res.status(404).send(`Quiz with ID ${req.params.quizId} not found`);
    }
    //Check if quiz is not already in course
    if (course.quizzes.includes(quiz._id)) {
      return res.status(400).send(`Quiz with ID ${req.params.quizId} already exists in course with ID ${req.params.courseId}`);
    }

    quiz.course = course._id; // Set the quiz's course to the specified course's ID
    await quiz.save(); // Save the quiz to the database

    course.quizzes.push(quiz._id); // Add the quiz's ID to the course's quizzes array
    await course.save(); // Save the updated course to the database

    res.status(200).send(course);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

module.exports = router;
