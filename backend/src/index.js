const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const routes = require('./routes');
app.use(cors());
app.use(express.json()); // fazendo com que o express entenda json req.body
app.use(routes)


//Models: são representação de entidades da nossa aplicação
//Conexão com o MongoDB
mongoose.connect('', { 
  useNewUrlParser: true,
  useUnifiedTopology: true,

});



//Query Params: req.query (Filtros, Ordenação, paginação) http://localhost:3333/users?name=Pedro
//Route Params: req.params (Identificar um recurso na alteração ou remoção "/:id")
//Body: req.body (Ddados para criação ou alteração de um registo)




app.listen('3333', () => {
  console.log('Server is running!')
} )