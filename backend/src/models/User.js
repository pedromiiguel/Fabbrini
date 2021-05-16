const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: String,
  cpf: String,
  birthDate: String,
  sex: String,
  telephone: String,
});

module.exports = mongoose.model('User', UserSchema);
