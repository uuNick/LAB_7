const { Sequelize, DataTypes } = require('sequelize');
const Buyer = require('./models/Buyer');
const FurnitureModel = require('./models/FurnitureModel');
const Contract = require('./models/Contract');
const Sale = require('./models/Sale');

const sequelize = new Sequelize('furniture', 'postgres', '1357924680', {
  dialect: 'postgres',
  host: 'localhost',
  port: 5432,
  logging: false 
});

const BuyerModel = Buyer(sequelize);
const FurnitureModelModel = FurnitureModel(sequelize);
const ContractModel = Contract(sequelize, BuyerModel);
const SaleModel = Sale(sequelize, ContractModel, FurnitureModelModel);

const models = {
    Buyer: BuyerModel,
    FurnitureModel: FurnitureModelModel,
    Contract: ContractModel,
    Sale: SaleModel
  };

// Определение связей (после определения моделей)
models.Buyer.hasMany(models.Contract, { foreignKey: 'buyer_id', onDelete: 'CASCADE' });
models.Contract.belongsTo(models.Buyer, { foreignKey: 'buyer_id', onDelete: 'RESTRICT' });

models.FurnitureModel.hasMany(models.Sale, { foreignKey: 'furniture_model_id', onDelete: 'CASCADE' });
models.Sale.belongsTo(models.FurnitureModel, { foreignKey: 'furniture_model_id', onDelete: 'RESTRICT' });

models.Contract.hasMany(models.Sale, { foreignKey: 'contract_number', onDelete: 'CASCADE' });
models.Sale.belongsTo(models.Contract, { foreignKey: 'contract_number', onDelete: 'RESTRICT' });

models.Buyer.sync({ alter: true })
  .then(() => models.FurnitureModel.sync({ alter: true }))
  .then(() => models.Contract.sync({ alter: true }))
  .then(() => models.Sale.sync({ alter: true }))
  .then(() => {
    console.log('Models synchronized with the database.');
  })
  .catch(error => {
    console.error('Error synchronizing models:', error);
  });

module.exports = models;