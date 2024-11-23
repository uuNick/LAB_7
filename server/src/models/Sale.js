const { DataTypes } = require('sequelize');

module.exports = (sequelize, Contract, FurnitureModel) => {
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

    Sale.belongsTo(Contract, { foreignKey: 'contract_number', onDelete: 'CASCADE' }); // Связь один-ко-многим с Contract
    Sale.belongsTo(FurnitureModel, { foreignKey: { name: 'furniture_model_id', allowNull: false }, onDelete: 'RESTRICT' }); // Связь один-ко-многим с FurnitureModel

    return Sale;
};