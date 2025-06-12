const { Loan, Book, User } = require('../models');
const { Op } = require('sequelize');

const createLoan = async (req, res) => {
  try {
    const { userId, bookId } = req.body;

    if (!userId || !bookId) {
      return res.status(400).json({ error: 'ID de usuario y libro son requeridos' });
    }

    // Verificar que el libro existe y está disponible
    const book = await Book.findOne({
      where: { id: bookId, disponible: true, eliminado: false }
    });

    if (!book) {
      return res.status(400).json({ error: 'Libro no disponible' });
    }

    // Verificar que el usuario existe
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(400).json({ error: 'Usuario no encontrado' });
    }

    // Crear fechas
    const fechaPrestamo = new Date();
    const fechaDevolucion = new Date();
    fechaDevolucion.setDate(fechaDevolucion.getDate() + 7); // 7 días después

    // Crear préstamo
    const loan = await Loan.create({
      userId,
      bookId,
      fechaPrestamo,
      fechaDevolucion,
      estado: 'prestado'
    });

    // Marcar libro como no disponible
    await book.update({ disponible: false });

    res.status(201).json({
      message: 'Préstamo creado exitosamente',
      loan
    });
  } catch (error) {
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

const returnLoan = async (req, res) => {
  try {
    const { id } = req.params;
    const loan = await Loan.findByPk(id);

    if (!loan) {
      return res.status(404).json({ error: 'Préstamo no encontrado' });
    }

    if (loan.estado === 'devuelto') {
      return res.status(400).json({ error: 'El libro ya fue devuelto' });
    }

    // Verificar si hay retraso
    const now = new Date();
    const estado = now > loan.fechaDevolucion ? 'con retraso' : 'devuelto';

    // Actualizar préstamo
    await loan.update({ estado });

    // Marcar libro como disponible
    const book = await Book.findByPk(loan.bookId);
    await book.update({ disponible: true });

    res.json({
      message: 'Libro devuelto exitosamente',
      loan,
      estado
    });
  } catch (error) {
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

const getAllLoans = async (req, res) => {
  try {
    const loans = await Loan.findAll({
      include: [
        { model: User, attributes: ['nombre', 'apellido', 'correo'] },
        { model: Book, attributes: ['titulo', 'autor'] }
      ]
    });

    res.json(loans);
  } catch (error) {
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

const getLoansByUser = async (req, res) => {
  try {
    const { usuario_id } = req.params;
    
    const loans = await Loan.findAll({
      where: { userId: usuario_id },
      include: [
        { model: User, attributes: ['nombre', 'apellido', 'correo'] },
        { model: Book, attributes: ['titulo', 'autor'] }
      ]
    });

    res.json(loans);
  } catch (error) {
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

module.exports = {
  createLoan,
  returnLoan,
  getAllLoans,
  getLoansByUser
};
