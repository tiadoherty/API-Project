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
        description: 'Welcome to Atlantis, the lost city of legend! Immerse yourself in the fascinating history and culture of this mythical city, as you explore the ruins of its ancient architecture and marvel at the breathtaking underwater landscapes. With luxurious accommodations, world-class dining, and endless opportunities for adventure, Atlantis is a truly unforgettable destination for travelers of all ages.',
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
        name: 'Mars House',
        description: 'Welcome to the Mars House, your ultimate vacation rental on the red planet! With a sleek and modern design, this house boasts stunning views of the Martian landscape from every room. Relax in the spacious living area or cook up a meal in the fully equipped kitchen, complete with state-of-the-art appliances. The bedrooms feature comfortable beds and large windows that offer unparalleled views of the Martian night sky. The house also has an outdoor living area, perfect for enjoying the cool Martian breeze and taking in the incredible surroundings. Book your stay at the Mars House for an unforgettable Martian adventure!',
        price: 184
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
        description: 'This futuristic and compact dwelling has everything you need for a comfortable and memorable stay on the red planet. Designed with sustainability in mind, the house is built vertically to maximize space and reduce its carbon footprint. The pod house also features a sleeping loft with a comfortable bed and a skylight that offers a stunning view of the Martian sky. Do not miss the chance to experience Martian as we enter the age of space tourism!',
        price: 265
      },
      {
        ownerId: 3,
        address: '789 Beach Road',
        city: 'Vaitape',
        state: 'Bora Bora',
        country: 'French Polynesia',
        lat: -16.5271,
        lng: -151.7404,
        name: 'H2Ome',
        description: 'Welcome to your dream vacation home in Bora Bora, the ultimate underwater oasis! This luxurious home is built into the crystal-clear waters of the lagoon, providing stunning panoramic views of the colorful marine life that surrounds it. The spacious living area features floor-to-ceiling windows that allow natural light to flood in and offer breathtaking views of the ocean. You will enjoy a fully equipped kitchen, comfortable sleeping quarters, and a private deck with direct access to the ocean for snorkeling and swimming.',
        price: 650
      },
      {
        ownerId: 4,
        address: '1 Lunar Way',
        city: 'Moonville',
        state: 'MN',
        country: 'The Universe',
        lat: -10,
        lng: 20,
        name: 'Tiny Home on the Moon',
        description: 'This tiny cabin on the moon is the ultimate escape from Earth. With just enough space for a cozy living area, a comfortable bed, and a small kitchenette, it\'s the perfect retreat for space adventurers. Despite its small size, the cabin has all the modern amenities you need for a comfortable stay, including air conditioning, heating, and a state-of-the-art filtration system to keep you safe and comfortable in the harsh lunar environment.',
        price: 75
      },
      {
        ownerId: 1,
        address: '252 Oceanic Blvd',
        city: 'Underwater City',
        state: 'Coral Bay',
        country: 'Pacific Ocean',
        lat: -10,
        lng: 20,
        name: 'The Pacific Hotel',
        description: 'The Pacific Underwater Hotel is an extraordinary destination for an unforgettable adventure. Located in the crystal-clear waters of the Pacific Ocean, this luxurious hotel offers a mesmerizing view of the vibrant marine life. With its avant-garde design, the hotel rooms and suites feature floor-to-ceiling windows, allowing you to enjoy the underwater world from the comfort of your own space.',
        price: 329
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
