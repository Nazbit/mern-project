const express = require('express');
const router = express.Router();
const newQuizModel = require('../models/quizModel');
const CourseModel = require('../models/courseModel');

router.delete('/deleteQuizById/:id', async (req, res) => {
  try {
    const deletedQuiz = await newQuizModel.findByIdAndDelete(req.params.id);
    if (!deletedQuiz) {
      return res.status(404).json({ message: 'Quiz not found' });
    }
    const courseId = deletedQuiz.course;
    await CourseModel.findByIdAndUpdate(courseId, { $pull: { quizzes: deletedQuiz._id } });
    res.json({ message: 'Quiz deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error deleting quiz' });
  }
});

module.exports = router;
