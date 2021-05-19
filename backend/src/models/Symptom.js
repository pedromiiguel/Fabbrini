const mongoose = require('mongoose');

const SymptomSchema = new mongoose.Schema({
  percaConciencia: Boolean,
  dorPeito: Boolean,
  dorAbdomen: Boolean,
  faltaAr: Boolean,
  percaForca: Boolean,
  reacaoAlergica: Boolean,
  trauma: Boolean,
  dorAnalgesico: Boolean,
  outrosMotivos: Boolean,
  User: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Symptom', SymptomSchema);
