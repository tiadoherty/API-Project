'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = 'Spots';
    return queryInterface.bulkInsert(options, [
      {
        ownerId: 1,
        address: '34 Talokan Ct.',
        city: 'Atlantis',
        state: 'Hawaii',
        country: 'United States of America',
        lat: 18.71,
        lng: -158.27,
        name: 'Underwater Temple',
        description: 'Ancient underwater temple believed to be the center of the ruins of Atlantis',
        price: 400
      },
      {
        ownerId: 2,
        address: '19 Red Dust Rd.',
        city: 'Unit 8',
        state: 'Mars Territory 4',
        country: 'United States of America',
        lat: 0,
        lng: 0,
        name: 'Mars Habitation',
        description: 'All the amenities of Earth, but with none of the earth.',
        price: 84
      },
      {
        ownerId: 2,
        address: '100 Hill St.',
        city: 'Unit 22',
        state: 'Mars Territory 8',
        country: 'United States of America',
        lat: 0,
        lng: 0,
        name: 'Futuristic Pod Home',
        description: 'Vertical pod habitat - Great for long term stays.',
        price: 265
      },
      {
        ownerId: 3,
        address: '789 Beach Road',
        city: 'Bora Bora',
        state: 'Bora Bora',
        country: 'French Polynesia',
        lat: -16.5271,
        lng: -151.7404,
        name: 'H2Ome',
        description: 'Beach fun for the whole family. NOTE: this property is underwater.',
        price: 650
      }
    ], {})

  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    options.tableName = 'Spots';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      ownerId: { [Op.in]: [1, 2, 3] }
    }, {})
  }
};
