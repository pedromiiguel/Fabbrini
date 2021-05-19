const { Router } = require('express');
const User = require('./models/User');
const Sympton = require('./models/Symptom');
const Health = require('./models/Health');
const ComplementaryData = require('./models/ComplementaryData');

const routes = Router();
routes.get('/', (req, res) => {
  return res.send('Ok');
});

routes.post('/complementaryData', async (req, res) => {
  try {
    // console.log(req.body)
    const {
      peso,
      altura,
      frequenciaCardiaca,
      frequenciaRespiratoria,
      pressaoArterial,
      oximetria,
      email,
      senha,
    } = req.body;

    const complementaryData = await ComplementaryData.create({
      peso,
      altura,
      frequenciaCardiaca,
      frequenciaRespiratoria,
      pressaoArterial,
      oximetria,
      email,
      senha,
    });

    res.status(201).json(complementaryData);
  } catch (error) {
    console.error(error);
  }
});

routes.post('/health', async (req, res) => {
  try {
    const { questionOne, questionTwo, questionThree, questionFour } = req.body;

    const health = await Health.create({
      questionOne,
      questionTwo,
      questionThree,
      questionFour,
    });

    return res.status(201).json(health);
  } catch (error) {
    console.error(error);
  }
});

routes.post('/sympton', async (req, res) => {
  try {
    const {
      percaConciencia,
      dorPeito,
      dorAbdomen,
      faltaAr,
      percaForca,
      reacaoAlergica,
      trauma,
      dorAnalgesico,
      outrosMotivos,
    } = req.body;
    console.log(req.body);

    const sympton = await Sympton.create({
      percaConciencia,
      dorPeito,
      dorAbdomen,
      faltaAr,
      percaForca,
      reacaoAlergica,
      trauma,
      dorAnalgesico,
      outrosMotivos,
    });

    return res.status(201).json(sympton);
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
