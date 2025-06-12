const express = require('express');
const router = express.Router();
const {
  addBook,
  getAllBooks,
  getBookById,
  updateBook,
  deleteBook,
  restoreBook
} = require('../controllers/bookController');
const { authenticateToken } = require('../middlewares/auth');

router.post('/add/book', authenticateToken, addBook);
router.get('/books', getAllBooks);
router.get('/book/:id', getBookById);
router.put('/book/:id', authenticateToken, updateBook);
router.delete('/book/:id', authenticateToken, deleteBook);
router.put('/restore/book/:id', authenticateToken, restoreBook);

module.exports = router;
