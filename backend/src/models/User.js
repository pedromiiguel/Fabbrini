const mongoose = require("mongoose");
const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  cpf: {
    type: String,
    required: true,
  },
  birthDate: {
    type: String,
    required: true,
  },
  sex: {
    type: String,
    required: true,
  },
  telephone: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});



module.exports = mongoose.model("User", UserSchema);
