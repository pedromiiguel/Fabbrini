const mongoose = require('mongoose');

const HealthShema = new mongoose.Schema({
  questionOne: String,
  questionTwo: String,
  questionThree: String,
  questionFour: String,
  User: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model('Health', HealthShema);
