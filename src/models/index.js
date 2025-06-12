const sequelize = require('../config/database');
const User = require('./User');
const Book = require('./Book');
const Loan = require('./Loan');

// Definir asociaciones
User.hasMany(Loan, { foreignKey: 'userId' });
Book.hasMany(Loan, { foreignKey: 'bookId' });
Loan.belongsTo(User, { foreignKey: 'userId' });
Loan.belongsTo(Book, { foreignKey: 'bookId' });

module.exports = {
  sequelize,
  User,
  Book,
  Loan
};