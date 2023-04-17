'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = 'Reviews';
    return queryInterface.bulkInsert(options, [
      {
        spotId: 1,
        userId: 2,
        review: 'Great location but wish there was a coffee machine',
        stars: 4
      },
      {
        spotId: 1,
        userId: 3,
        review: 'Clean house with great wineries nearby',
        stars: 5
      },
      {
        spotId: 1,
        userId: 2,
        review: 'Came for a second stay and still no coffee machine',
        stars: 3
      },
      {
        spotId: 2,
        userId: 2,
        review: 'Loved the aquarium but too much street noise',
        stars: 4
      },
      {
        spotId: 2,
        userId: 3,
        review: 'Host was rude, do not recommend',
        stars: 1
      },
      {
        spotId: 3,
        userId: 1,
        review: 'Lanikai beach is beautiful',
        stars: 5
      },
      {
        spotId: 3,
        userId: 2,
        review: 'Hard to get to from the airport',
        stars: 3
      },
    ], {})
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = 'Reviews';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      spotId: { [Op.in]: [1, 2, 3] }
    }, {});
  }
};
