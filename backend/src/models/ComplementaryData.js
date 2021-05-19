const mongoose = require('mongoose');

const ComplementaryDataSchema = new mongoose.Schema({
  peso: String,
  altura: String,
  frequenciaCardiaca: String,
  frequenciaRespiratoria: String,
  pressaoArterial: String,
  oximetria: String,
  email: String,
  senha: String,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model('ComplementaryData', ComplementaryDataSchema);
