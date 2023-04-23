const mongoose = require("mongoose");

// Quiz schema/model
const quizSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      minlength: 3,
      trim: true
    },
    explanation: {
      type: String,
      required: true,
      trim: true
    },
    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "course",
      
    },
    date: {
      type: Date,
      default: Date.now
    },
    questions: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'question'
    }],
  },
  { collection: "quizzes" }
);

module.exports = mongoose.model("Quiz", quizSchema);
