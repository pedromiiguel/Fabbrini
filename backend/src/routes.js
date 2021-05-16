const { Router } = require('express');
const User = require('./models/User');
const Reason = require('./models/Reason');

const routes = Router();
routes.get('/', (req, res) => {
  return res.send('Ok');
});

routes.post('/reasons', async (req, res) => {
  try {
    const {
      percaConciencia,
      dorPeito,
      dorAbdomen,
      faltaAr,
      percaForça,
      reacaoAlergica,
      trauma,
      dorAnalgesico,
      outrosMotivos,
    } = req.body;
    
    const reason = await Reason.create({
      percaConciencia,
      dorPeito,
      dorAbdomen,
      faltaAr,
      percaForça,
      reacaoAlergica,
      trauma,
      dorAnalgesico,
      outrosMotivos,
    });

    return res.send({ reason });
  } catch (error) {
    console.error(error);
    return res.status(400).send({ error: 'Error creating new reasons' });
  }
});

routes.post('/users', async (req, res) => {
  const { name, cpf, birthDate, sex, telephone } = req.body;

  const user = await User.create({
    name,
    cpf,
    birthDate,
    sex,
    telephone,
  });
  console.log(user);
  return res.json(user);
});

module.exports = routes;
