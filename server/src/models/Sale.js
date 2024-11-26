const { DataTypes } = require('sequelize');
const sequelize = require("../db");

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
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT'
    },
    furniture_model_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: FurnitureModel,
            key: 'furniture_model_id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT'
    }
}, {
    tableName: 'sales',
    timestamps: false
});

module.exports = Sale;