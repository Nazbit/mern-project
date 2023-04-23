const express = require('express');
const router = express.Router();
const newQuestionModel = require('../../models/questionModel');
const newQuizModel = require('../../models/quizModel');

router.delete('/deleteQuestionById/:id', async (req, res) => {
  try {
    const deletedQuestion = await newQuestionModel.findByIdAndDelete(req.params.id);
    if (!deletedQuestion) {
      return res.status(404).json({ message: 'Question not found' });
    }
    
    // Find all quizzes that reference the deleted question
    const affectedQuizzes = await newQuizModel.find({ questions: deletedQuestion._id });
    
    // Update each affected quiz to remove the deleted question
    const updates = affectedQuizzes.map(async (quiz) => {
      quiz.questions = quiz.questions.filter((questionId) => questionId.toString() !== deletedQuestion._id.toString());
      await quiz.save();
    });
    
    // Wait for all updates to complete
    await Promise.all(updates);
    
    res.json({ message: 'Question deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error deleting question' });
  }
});

module.exports = router;
