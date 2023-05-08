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
        reviewId: 3,
        url: 'https://miro.medium.com/v2/resize:fit:720/format:webp/0*CpmvQg345KX-ZDWj.jpg'
      },
      {
        reviewId: 5,
        url: 'https://globalnews.ca/wp-content/uploads/2018/07/gettyimages-521405184-e1530816311202.jpg?quality=85&strip=all&w=720'
      },
      {
        reviewId: 5,
        url: 'https://static.india.com/wp-content/uploads/2014/10/mars-comet.jpg'
      },
    ], {})
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = 'ReviewImages';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      reviewId: { [Op.in]: [3, 5] }
    }, {});
  }
};
