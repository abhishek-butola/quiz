const mongoose = require('mongoose');
const QuestionSchema = mongoose.Schema({
  question: {
    type: String,
    required: true
  },
  choices: [
    {
      value: Number,
      text: String
    }
  ],
  answer: {
    type: Number,
    default: -1
  },
  questionId: {
    type: String
  }
});

module.exports = mongoose.model('Question', QuestionSchema);
