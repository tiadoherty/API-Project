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
        userId: 2,
        startDate: new Date("2022-01-05"),
        endDate: new Date("2022-01-10")
      },
      {
        spotId: 1,
        userId: 3,
        startDate: new Date("2022-04-12"),
        endDate: new Date("2022-04-14")
      },
      {
        spotId: 1,
        userId: 3,
        startDate: new Date("2022-10-07"),
        endDate: new Date("2022-10-12")
      },
      {
        spotId: 2,
        userId: 2,
        startDate: new Date("2022-02-25"),
        endDate: new Date("2022-02-28")
      },
      {
        spotId: 2,
        userId: 3,
        startDate: new Date("2022-03-02"),
        endDate: new Date("2022-03-09")
      },
      {
        spotId: 3,
        userId: 1,
        startDate: new Date("2022-05-17"),
        endDate: new Date("2022-05-30")
      },
      {
        spotId: 3,
        userId: 2,
        startDate: new Date("2022-06-10"),
        endDate: new Date("2022-06-16")
      },
    ], {})
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = 'Bookings';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      spotId: { [Op.in]: [1, 2, 3] }
    }, {});
  }
};
