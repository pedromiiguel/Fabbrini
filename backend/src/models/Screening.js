const mongoose = require("mongoose");

const ScreeningSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Types.ObjectId,
    ref: 'User'
  },
  color: {
    type: String,
    enum: ["red", "orange", "yellow", "green", "blue"],
    required: true,
  },
  query: {
    type: Boolean,
  },
  flowchart: {
    type: String,
    required: true,
  },
  discriminators: {
    type: Object,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("Screening", ScreeningSchema);
