const Buyer = require("./Buyer");
const Contract = require("./Contract");
const FurnitureModel = require("./FurnitureModel");
const Sale = require("./Sale");

Buyer.hasMany(Contract, { foreignKey: 'buyer_id', onDelete: 'CASCADE' });
Contract.belongsTo(Buyer, { foreignKey: 'buyer_id'});

FurnitureModel.hasMany(Sale, { foreignKey: 'furniture_model_id', onDelete: 'CASCADE' });
Sale.belongsTo(FurnitureModel, { foreignKey: 'furniture_model_id'});

Contract.hasMany(Sale, { foreignKey: 'contract_number', onDelete: 'CASCADE' });
Sale.belongsTo(Contract, { foreignKey: 'contract_number'});

module.exports = {
    Buyer,
    Contract,
    FurnitureModel,
    Sale,
  };