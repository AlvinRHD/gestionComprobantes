const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const multer = require('multer'); // Si lo necesitas aquí
require('dotenv').config();

const app = express();
const port = process.env.PORT || 4000;

// Middleware
app.use(cors({
  origin: 'http://127.0.0.1:5500',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
}));
app.use(express.json()); // Procesar JSON
app.use(express.urlencoded({ extended: true })); // Procesar datos de formularios

// Rutas
app.use('/api/empresas', require('./routes/empresas'));
app.use('/api/usuarios', require('./routes/usuarios'));
app.use('/api/comprobantes', require('./routes/comprobantes'));

// Iniciar servidor
app.listen(port, () => {
  console.log(`Servidor iniciado en el puerto ${port}`);
});
