const mongoose = require('mongoose');

const answerSchema = new mongoose.Schema({
    participant: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
    },
    questionId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'question',
        required: true,
    },
    answerText: {
        type: String,
        required: true,
    },
});

const Answer = mongoose.model('Answer', answerSchema);

module.exports = Answer;
