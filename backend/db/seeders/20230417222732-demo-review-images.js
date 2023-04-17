'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = 'ReviewImages';
    return queryInterface.bulkInsert(options, [
      {
        reviewId: 2,
        url: 'exampleimage1.com'
      },
      {
        reviewId: 3,
        url: 'nocoffeemachine.com'
      },
      {
        reviewId: 6,
        url: 'exampleimage3.com'
      },
    ], {})
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = 'ReviewImages';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      reviewId: { [Op.in]: [2, 3, 6] }
    }, {});
  }
};
