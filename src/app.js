const express = require('express');
const cors = require('cors');
const { sequelize } = require('./models');

// Importar rutas
const authRoutes = require('./routes/auth');
const bookRoutes = require('./routes/books');
const loanRoutes = require('./routes/loans');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Rutas
app.use('/api', authRoutes);
app.use('/api', bookRoutes);
app.use('/api', loanRoutes);

// Ruta de prueba
app.get('/', (req, res) => {
  res.json({ message: 'API Biblioteca funcionando correctamente' });
});

// Manejo de errores 404
app.use('*', (req, res) => {
  res.status(404).json({ error: 'Ruta no encontrada' });
});

module.exports = app;
