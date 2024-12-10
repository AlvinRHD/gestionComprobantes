const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const multer = require('multer'); // Si lo necesitas aquí
require('dotenv').config();
const path = require('path');
const app = express();
const port = process.env.PORT || 4000;

// Middleware
app.use(cors({
  origin: 'http://127.0.0.1:5500',  // Ajusta esto si el frontend está en otra URL
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
}));
app.use(express.json()); // Procesar JSON
app.use(express.urlencoded({ extended: true })); // Procesar datos de formularios

// Servir archivos estáticos desde la carpeta frontend
app.use(express.static(path.join(__dirname, '../frontend')));  // Corrección aquí

// Redirigir la raíz a login.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend', 'login.html'));  // Corrección aquí
});

// Rutas de la API
app.use('/api/empresas', require('./routes/empresas'));
app.use('/api/usuarios', require('./routes/usuarios'));
app.use('/api/comprobantes', require('./routes/comprobantes'));

// Iniciar servidor
app.listen(port, () => {
  console.log(`Servidor iniciado en el puerto ${port}`);
});
