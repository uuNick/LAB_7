const { DataTypes } = require('sequelize');
const sequelize = require("../db");


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
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT'
      }
  }, {
    tableName: 'contracts',
    timestamps: false
  });

  //Contract.belongsTo(Buyer, { foreignKey: 'buyer_id', onDelete: 'RESTRICT' }); // Связь один-ко-многим с Buyer

module.exports = Contract;