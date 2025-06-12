const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './biblioteca.db',
  logging: false
});

module.exports = sequelize;