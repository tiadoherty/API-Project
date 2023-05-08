'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = 'Bookings';
    return queryInterface.bulkInsert(options, [
      {
        spotId: 1,
        userId: 7,
        startDate: new Date("2024-01-05"),
        endDate: new Date("2024-01-10")
      },
      {
        spotId: 1,
        userId: 5,
        startDate: new Date("2024-04-12"),
        endDate: new Date("2024-04-14")
      },
      {
        spotId: 1,
        userId: 4,
        startDate: new Date("2024-10-07"),
        endDate: new Date("2024-10-12")
      },
      {
        spotId: 2,
        userId: 8,
        startDate: new Date("2024-02-25"),
        endDate: new Date("2024-02-28")
      },
      {
        spotId: 2,
        userId: 6,
        startDate: new Date("2024-03-02"),
        endDate: new Date("2024-03-09")
      },
      {
        spotId: 3,
        userId: 8,
        startDate: new Date("2024-05-17"),
        endDate: new Date("2024-05-30")
      },
      {
        spotId: 4,
        userId: 5,
        startDate: new Date("2024-06-10"),
        endDate: new Date("2024-06-16")
      },
    ], {})
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = 'Bookings';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      spotId: { [Op.in]: [1, 2, 3, 4] }
    }, {});
  }
};
