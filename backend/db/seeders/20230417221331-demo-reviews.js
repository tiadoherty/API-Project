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
      {
        spotId: 5,
        userId: 2,
        review: 'I had an absolutely incredible stay at the tiny home on the moon! Despite its compact size, this little cabin was well-appointed with all the modern amenities I needed for a comfortable and enjoyable stay. The views of the lunar landscape from the cabins large windows were absolutely breathtaking, and I loved falling asleep each night to the incredible sight of the moonlit landscape outside. ',
        stars: 5
      },
      {
        spotId: 6,
        userId: 6,
        review: 'I recently had the pleasure of staying at the underwater hotel and it was an incredible experience from start to finish! The hotels stunning location beneath the oceans surface offered a one-of-a-kind view of the marine life that surrounded us, and the accommodations were luxurious and comfortable. The staff was incredibly friendly and accommodating, and the attention to detail throughout the hotel was impressive',
        stars: 5
      },
      {
        spotId: 6,
        userId: 7,
        review: 'My children were not able to participate in any of the activities or amenities, and we were not made aware of this before booking. The atmosphere was geared towards adult-only guests, which made it difficult to relax and enjoy our stay as a family. While the hotels location and design were impressive, the lack of family-friendly options left us feeling dissatisfied with our overall experience.',
        stars: 3
      },
      {
        spotId: 6,
        userId: 8,
        review: 'Really unique and interesting stay, would definitely come back!',
        stars: 5
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
