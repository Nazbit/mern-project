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
    questions: [
      {
        type: String,
        required: true
      }
    ],
    options: [
      [
        {
          type: String,
          required: true
        }
      ]
    ],
    correctAnswers: [
      {
        type: Number,
        required: true
      }
    ],
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
    }
  },
  { collection: "quizzes" }
);

module.exports = mongoose.model("Quiz", quizSchema);
