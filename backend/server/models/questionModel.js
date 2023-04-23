const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  questionText: {
    type: String,
    required: true
  },
  options: {
    type: [String],
    required: true
  },
  correctAnswer: {
    type: Number,
    required: true
  },
  explanation: {
    type: String,
    default: ""
  },
  image: {
    type: String,
    default: ""
  },
  difficulty: {
    type: String,
    default: "medium"
  },
  tags: {
    type: [String],
    default: []
  },
  quiz: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Quiz'
  }
});

module.exports = mongoose.model('Question', questionSchema);

