const express = require('express');
const router = express.Router();
const newQuizModel = require('../../models/quizModel');
const newCourseModel = require('../../models/courseModel');
const newQuestionModel = require('../../models/questionModel');

router.delete('/deleteQuizById/:id', async (req, res) => {
  try {
    const deletedQuiz = await newQuizModel.findByIdAndDelete(req.params.id);
    if (!deletedQuiz) {
      return res.status(404).json({ message: 'Quiz not found' });
    }

    // Find all questions that reference the deleted quiz
    const affectedQuestions = await newQuestionModel.find({ quiz: deletedQuiz._id });

    // Update each affected question to set the quiz field to null
    const updates = affectedQuestions.map(question => {
      question.quiz = null;
      return question.save();
    });

    // Wait for all updates to complete
    await Promise.all(updates);

    // Remove the quiz from the course's "quizzes" array
    const courseId = deletedQuiz.course;
    await newCourseModel.findByIdAndUpdate(courseId, { $pull: { quizzes: deletedQuiz._id } });

    // Delete all questions associated with the deleted quiz
    await newQuestionModel.deleteMany({ quiz: deletedQuiz._id });

    res.json({ message: 'Quiz deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error deleting quiz' });
  }
});

module.exports = router;
