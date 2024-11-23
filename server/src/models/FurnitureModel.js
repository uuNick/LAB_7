const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const FurnitureModel = sequelize.define('FurnitureModel', {
    furniture_model_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
    },
    furniture_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    model: {
      type: DataTypes.STRING,
      allowNull: false
    },
    characteristics: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    }
  }, {
    tableName: 'furniture_models',
    timestamps: false
  });

  return FurnitureModel;
};