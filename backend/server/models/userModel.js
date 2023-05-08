const mongoose = require("mongoose");

const newUserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      label: "username",
      unique: true
    },
    email: {
      type: String,
      required: true,
      label: "email",
      unique: true
    },
    password: {
      required: true,
      type: String,
      min: 8,
    },
    quizScores: [
      {
        quizId: {
          type: mongoose.Schema.Types.ObjectId,
          
        },
        score: {
          type: Number,
        },
      },
    ],
    isAdmin: {
      type: Boolean,
      default: false,
    },
    date: {
      type: Date,
      default: Date.now,
    },
    timeout: {
      type: Number
    }
  },
  { collection: "users" }
);

module.exports = mongoose.model("users", newUserSchema);
