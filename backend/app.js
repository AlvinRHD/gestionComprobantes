const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 4000;

//Middleware
app.use(cors());
app.use(bodyParser.json());

//Routes
app.use('/api/empresas', require('./routes/empresas'));
//app.use('/api/usuarios', require('./routes/usuarios'));

//Start server
app.listen(port, () => {
  console.log(`Servidor iniciado en el puerto ${port}`);
});
