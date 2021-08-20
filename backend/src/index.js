require('dotenv').config();
const express = require('express');
const app = express();
const morgan = require('morgan');
const cors = require('cors');
require('./database');
app.use(cors());
app.use(express.json()); // fazendo com que o express entenda json req.body
app.use('/user', require('./routes/user.routes'));
app.use('/screening', require('./routes/screening.routes'));

app.use(morgan('dev'));

app.listen(process.env.PORT || 3333, () => {
  console.log('Server is running!');
});
