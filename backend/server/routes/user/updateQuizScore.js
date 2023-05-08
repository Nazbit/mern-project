const express = require("express");
const router = express.Router();
const User = require("../../models/userModel");

router.post("/updateQuizScore", async (req, res) => {
  const { userId, quizId, score } = req.body;

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const existingQuiz = user.quizScores.find(
      (scoreObj) => scoreObj.quizId.toString() === quizId
    );

    if (existingQuiz) {
      // If quiz with the same ID exists, delete it
      user.quizScores.pull(existingQuiz);
    }

    // Add the new quiz with the updated score
    user.quizScores.push({ quizId, score });
    
    await user.save();

    return res.status(200).json({ message: "Quiz score updated successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server Error" });
  }
});

module.exports = router;
