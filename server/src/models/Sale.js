const { DataTypes } = require('sequelize');
const sequelize = require("../db");
const Contract = require("./Contract");
const FurnitureModel = require("./FurnitureModel");

const Sale = sequelize.define('Sale', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    contract_number: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Contract,
            key: 'contract_number'
        },
    },
    furniture_model_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: FurnitureModel,
            key: 'furniture_model_id'
        },
    }
},
    {
        foreignKeyConstraints: true
    });

//Sale.belongsTo(FurnitureModel, { foreignKey: 'furniture_model_id', onDelete: 'RESTRICT' });
//Sale.belongsTo(Contract, { foreignKey: 'contract_number', onDelete: 'RESTRICT' });

module.exports = Sale;