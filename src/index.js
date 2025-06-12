// src/index.js
const express = require('express');
const cors = require('cors');
require('dotenv').config(); // Si usas variables de entorno

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(express.json());

// Importar rutas
const authRoutes = require('./routes/auth');

// Usar rutas
app.use('/', authRoutes); // O usa '/api' o '/auth' si prefieres prefijo

// Ruta de prueba
app.get('/', (req, res) => {
  res.send('API de biblioteca funcionando 🚀');
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
