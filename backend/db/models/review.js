'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Review extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      //spot to review relationship
      Review.belongsTo(
        models.Spot,
        {
          foreignKey: 'spotId'
        }
      );

      //review to reviewImage relationship
      Review.hasMany(
        models.ReviewImage,
        {
          foreignKey: 'reviewId'
        }
      );

      //user to review relationship
      Review.belongsTo(
        models.User,
        {
          foreignKey: 'userId'
        }
      )
    }
  }
  Review.init({
    spotId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    review: DataTypes.STRING,
    stars: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Review',
  });
  return Review;
};
