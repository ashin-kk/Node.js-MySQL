const { DataTypes } = require('sequelize');
const db = require('../../../config/dbConnections');

const ContactSchema = db.define('Contact', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  phoneNumber: { type: DataTypes.STRING },
  email: { type: DataTypes.STRING },
  linkedId: { type: DataTypes.INTEGER },
  linkPrecedence: { type: DataTypes.ENUM, values: ['secondary', 'primary'] },
  createdAt: { type: DataTypes.DATE },
  updatedAt: { type: DataTypes.DATE },
  deletedAt: { type: DataTypes.DATE },
});

module.exports = ContactSchema;
