const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 4000;

// Middleware
app.use(cors({
  origin: (origin, callback) => {
    const allowedOrigins = [
      'http://localhost:4000',
      'https://alvinrhd.github.io/gestionComprobantes/',
      'https://contadorcitorender.onrender.com'
    ];

    // Permitir peticiones sin origen (como desde herramientas locales)
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('No permitido por CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
}));
app.use(express.json()); // Procesar JSON
app.use(express.urlencoded({ extended: true })); // Procesar datos de formularios

// Servir archivos estáticos desde la carpeta frontend
app.use(express.static(path.join(__dirname, '../frontend')));

// Ruta raíz para servir index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'frontend', 'login.html'));
});


// Rutas API
app.use('/api/empresas', require('./routes/empresas'));
app.use('/api/usuarios', require('./routes/usuarios'));
app.use('/api/comprobantes', require('./routes/comprobantes'));

// Iniciar servidor
app.listen(port, () => {
  console.log(`Servidor iniciado en el puerto ${port}`);
});
