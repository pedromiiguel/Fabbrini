const mongoose = require('mongoose');

const ReasonSchema = new mongoose.Schema({
  percaConciencia: Boolean,
  dorPeito: Boolean,
  dorAbdomen: Boolean,
  faltaAr: Boolean,
  percaForça: Boolean,
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

module.exports = mongoose.model('Reason', ReasonSchema);
