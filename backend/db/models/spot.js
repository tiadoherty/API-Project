'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Spot extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      //user to spot relationship
      Spot.belongsTo(
        models.User,
        {
          foreignKey: 'ownerId'
        }
      );

      // spot to spot image relationship
      Spot.hasMany(
        models.SpotImage,
        {
          foreignKey: 'spotId'
        }
      );

      //spot to booking relationship
      Spot.hasMany(
        models.Booking,
        {
          foreignKey: 'spotId'
        }
      );

      //spot to review relationship
      Spot.hasMany(
        models.Review,
        {
          foreignKey: 'spotId'
        }
      )
    }
  }
  Spot.init({
    ownerId: DataTypes.INTEGER,
    address: DataTypes.STRING,
    city: DataTypes.STRING,
    state: DataTypes.STRING,
    country: DataTypes.STRING,
    lat: DataTypes.DECIMAL,
    lng: DataTypes.DECIMAL,
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    price: DataTypes.DECIMAL
  }, {
    sequelize,
    modelName: 'Spot',
  });
  return Spot;
};
