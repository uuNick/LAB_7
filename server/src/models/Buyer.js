const { DataTypes } = require('sequelize');
const sequelize = require("../db");

const Buyer = sequelize.define('Buyer', {
  buyer_id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false
  },
  buyer_name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  buyer_address: {
    type: DataTypes.STRING,
    allowNull: false
  },
  buyer_phone: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

module.exports = Buyer;