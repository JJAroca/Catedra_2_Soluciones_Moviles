const { Book } = require('../models');

const addBook = async (req, res) => {
  try {
    const { titulo, autor, genero, fechaPublicacion } = req.body;

    if (!titulo || !autor || !genero || !fechaPublicacion) {
      return res.status(400).json({ error: 'Todos los campos son requeridos' });
    }

    const book = await Book.create({
      titulo,
      autor,
      genero,
      fechaPublicacion,
      disponible: true,
      eliminado: false
    });

    res.status(201).json({
      message: 'Libro agregado exitosamente',
      book
    });
  } catch (error) {
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

const getAllBooks = async (req, res) => {
  try {
    const books = await Book.findAll({
      where: { eliminado: false }
    });
    res.json(books);
  } catch (error) {
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

const getBookById = async (req, res) => {
  try {
    const { id } = req.params;
    const book = await Book.findOne({
      where: { id, eliminado: false }
    });

    if (!book) {
      return res.status(404).json({ error: 'Libro no encontrado' });
    }

    res.json(book);
  } catch (error) {
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

const updateBook = async (req, res) => {
  try {
    const { id } = req.params;
    const { titulo, autor, genero, fechaPublicacion } = req.body;

    const book = await Book.findOne({
      where: { id, eliminado: false }
    });

    if (!book) {
      return res.status(404).json({ error: 'Libro no encontrado' });
    }

    await book.update({
      titulo: titulo || book.titulo,
      autor: autor || book.autor,
      genero: genero || book.genero,
      fechaPublicacion: fechaPublicacion || book.fechaPublicacion
    });

    res.json({
      message: 'Libro actualizado exitosamente',
      book
    });
  } catch (error) {
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

const deleteBook = async (req, res) => {
  try {
    const { id } = req.params;
    const book = await Book.findByPk(id);

    if (!book) {
      return res.status(404).json({ error: 'Libro no encontrado' });
    }

    await book.update({ eliminado: true });

    res.json({ message: 'Libro eliminado exitosamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

const restoreBook = async (req, res) => {
  try {
    const { id } = req.params;
    const book = await Book.findByPk(id);

    if (!book) {
      return res.status(404).json({ error: 'Libro no encontrado' });
    }

    await book.update({ eliminado: false });

    res.json({ message: 'Libro restaurado exitosamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

module.exports = {
  addBook,
  getAllBooks,
  getBookById,
  updateBook,
  deleteBook,
  restoreBook
};