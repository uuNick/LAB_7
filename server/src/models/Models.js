const Buyer = require("./Buyer");
const Contract = require("./Contract");
const FurnitureModel = require("./FurnitureModel");
const Sale = require("./Sale");

Buyer.hasMany(Contract, { foreignKey: 'buyer_id', onDelete: 'SET NULL' });
Contract.belongsTo(Buyer, { foreignKey: 'buyer_id', onDelete: 'RESTRICT' });

FurnitureModel.hasMany(Sale, { foreignKey: 'furniture_model_id', onDelete: 'SET NULL' });
Sale.belongsTo(FurnitureModel, { foreignKey: 'furniture_model_id', onDelete: 'RESTRICT' });

Contract.hasMany(Sale, { foreignKey: 'contract_number', onDelete: 'SET NULL' });
Sale.belongsTo(Contract, { foreignKey: 'contract_number', onDelete: 'RESTRICT' });

module.exports = {
    Buyer,
    Contract,
    FurnitureModel,
    Sale,
  };