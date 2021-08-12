require('dotenv').config()
const express = require('express');
const app = express();
const morgan = require('morgan');
const cors = require('cors');
require('./database');
app.use(cors());
app.use(express.json()); // fazendo com que o express entenda json req.body

app.use('/user', require('./routes/user.routes'))
app.use('/screening', require('./routes/screening.routes'))

app.use(morgan('dev'))


//Models: são representação de entidades da nossa aplicação

//Query Params: req.query (Filtros, Ordenação, paginação) http://localhost:3333/users?name=Pedro
//Route Params: req.params (Identificar um recurso na alteração ou remoção "/:id")
//Body: req.body (Ddados para criação ou alteração de um registo)




app.listen('3333', () => {
  console.log('Server is running!')
} )
