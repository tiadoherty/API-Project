'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = 'SpotImages';
    return queryInterface.bulkInsert(options, [
      {
        spotId: 1,
        url: 'exampleimage1.com',
        preview: true
      },
      {
        spotId: 1,
        url: 'exampleimage2.com',
        preview: false
      },
      {
        spotId: 2,
        url: 'exampleimage3.com',
        preview: true
      },
      {
        spotId: 3,
        url: 'exampleimage4.com',
        preview: true
      },
      {
        spotId: 3,
        url: 'exampleimage5.com',
        preview: false
      },
      {
        spotId: 3,
        url: 'exampleimage6.com',
        preview: false
      }
    ], {})
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = 'SpotImages';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      spotId: { [Op.in]: [1, 2, 3] }
    }, {});
  }
};
