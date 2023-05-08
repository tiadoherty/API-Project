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
        userId: 7,
        review: 'Great location but wish there was a coffee machine',
        stars: 4
      },
      {
        spotId: 1,
        userId: 3,
        review: 'Love the view! Really felt like home.',
        stars: 5
      },
      {
        spotId: 1,
        userId: 8,
        review: 'Thought there would be a house here, but it is just ruins :(',
        stars: 2
      },
      {
        spotId: 2,
        userId: 4,
        review: 'Air was stale. Not a lot of good restaurants nearby.',
        stars: 2
      },
      {
        spotId: 3,
        userId: 4,
        review: 'Excellent stargazing!',
        stars: 5
      },
      {
        spotId: 3,
        userId: 5,
        review: 'Spacious with new appliances, however, there were lots of stairs.',
        stars: 4
      },
      {
        spotId: 4,
        userId: 6,
        review: 'Great host! She was super communicative and nice. Home was well decorated.',
        stars: 5
      },
      {
        spotId: 4,
        userId: 8,
        review: 'Hard to get to from the airport',
        stars: 3
      },
    ], {})
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = 'Reviews';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      spotId: { [Op.in]: [1, 2, 3, 4] }
    }, {});
  }
};
