const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
  },
});

const Question = mongoose.model('question', questionSchema);

module.exports = Question;
