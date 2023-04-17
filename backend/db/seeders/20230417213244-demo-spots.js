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
        address: '123 Wine Street',
        city: 'Sonoma',
        state: 'California',
        country: 'United States of America',
        lat: 38.2919,
        lng: 122.4580,
        name: 'Napa Getaway',
        description: 'Cute cottage to stay in while enjoying Sonoma vineyards',
        price: 160
      },
      {
        ownerId: 1,
        address: '456 Otter Blvd',
        city: 'Monterey',
        state: 'California',
        country: 'United States of America',
        lat: 36.6002,
        lng: 121.8947,
        name: 'Aquarium Apartment',
        description: 'Enjoy walking to the Monterey Bay Aquarium!',
        price: 135
      },
      {
        ownerId: 3,
        address: '789 Beach Road',
        city: 'Kailua',
        state: 'Hawaii',
        country: 'United States of America',
        lat: 21.3946,
        lng: 157.7434,
        name: 'Beach Vacation Rental',
        description: 'Beach fun for the whole family',
        price: 350
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
      name: { [Op.in]: ['Napa Getaway', 'Aquarium Apartment', 'Beach Vacation Rental'] }
    }, {})
  }
};
