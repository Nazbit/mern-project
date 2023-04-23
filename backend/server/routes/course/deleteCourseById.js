const express = require('express');
const router = express.Router();
const newCourseModel = require('../../models/courseModel');
const newSectionModel = require('../../models/sectionModel');
const newQuizModel = require('../../models/quizModel');
const deleteCourseFromSection = require('./deleteCourseFromSection');

router.delete('/deleteCourseById/:id', async (req, res) => {
  try {
    const courseId = req.params.id;

    // Find all quizzes associated with the course
    const quizzes = await newQuizModel.find({ course: courseId });

    // For each quiz, find all questions associated with it and delete them
    const deleteQuestions = quizzes.map(async (quiz) => {
      const questions = await newQuestionModel.find({ quiz: quiz._id });
      await Promise.all(questions.map(q => q.remove()));
    });

    // Wait for all questions to be deleted
    await Promise.all(deleteQuestions);

    // Delete all quizzes associated with the course
    await newQuizModel.deleteMany({ course: courseId });

    // Remove deleted quizzes from the `quizzes` array of the course
    await newCourseModel.findByIdAndUpdate(courseId, { $unset: { quizzes: "" } });

    // Delete the course
    await newCourseModel.findByIdAndDelete(courseId);

    // Delete the course from all sections that reference it
    await deleteCourseFromSection(courseId);

    res.json({ message: 'Course deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error deleting course' });
  }
});

module.exports = router;
