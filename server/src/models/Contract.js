const { DataTypes } = require('sequelize');
const sequelize = require("../db");
const Buyer = require("./Buyer");

const Contract = sequelize.define('Contract', {
  contract_number: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  contract_date: {
    type: DataTypes.DATEONLY,
    allowNull: false
  },
  execution_date: {
    type: DataTypes.DATEONLY,
    allowNull: true
  },
  buyer_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Buyer,
      key: 'buyer_id'
    },
  }
});


module.exports = Contract;