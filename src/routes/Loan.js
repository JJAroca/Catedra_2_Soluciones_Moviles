const express = require('express');
const router = express.Router();
const {
  createLoan,
  returnLoan,
  getAllLoans,
  getLoansByUser
} = require('../controllers/LoanController');
const { authenticateToken } = require('../middlewares/auth');

router.post('/loan', authenticateToken, createLoan);
router.put('/loan/return/:id', authenticateToken, returnLoan);
router.get('/loans', authenticateToken, getAllLoans);
router.get('/loans/users/:usuario_id', authenticateToken, getLoansByUser);

module.exports = router;
