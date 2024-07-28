const { Sequelize } = require('sequelize');
const db = new Sequelize(process.env.DATABASE_URI);

db.authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch((error) => {
    console.error('Unable to connect to the database: ', error);
  });

module.exports = db;
