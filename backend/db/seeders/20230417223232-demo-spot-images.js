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
        url: 'https://assets.editorial.aetnd.com/uploads/2015/10/top-6-theories-about-atlantiss-featured-photo.jpg?width=1920&height=960&crop=1920%3A960%2Csmart&quality=75',
        preview: true
      },
      {
        spotId: 1,
        url: 'https://img.thedailybeast.com/image/upload/c_crop,d_placeholder_euli9k,h_1688,w_3000,x_0,y_0/dpr_1.5/c_limit,w_1600/fl_lossy,q_auto/v1648888898/220401-atlantis-hero_v4rznl',
        preview: false
      },
      {
        spotId: 2,
        url: 'https://i.insider.com/5824be9fdd0895d1368b47e8?width=700&format=jpeg&auto=webp',
        preview: true
      },
      {
        spotId: 2,
        url: 'https://i.insider.com/5824be9fdd0895d1368b47ea?width=700&format=jpeg&auto=webp',
        preview: false
      },
      {
        spotId: 2,
        url: 'https://i.insider.com/5824be9fdd0895d1368b47eb?width=700&format=jpeg&auto=webp',
        preview: false
      },
      {
        spotId: 2,
        url: 'https://i.insider.com/5824be9fdd0895d1368b47f0?width=700&format=jpeg&auto=webp',
        preview: false
      },
      {
        spotId: 2,
        url: 'https://i.insider.com/5824be9fdd0895d1368b47ee?width=700&format=jpeg&auto=webp',
        preview: false
      },
      {
        spotId: 2,
        url: 'https://i.insider.com/5824be9fdd0895d1368b47ef?width=700&format=jpeg&auto=webp',
        preview: false
      },
      {
        spotId: 3,
        url: 'https://image.cnbcfm.com/api/v1/image/105932449-1558716242215aispacemarspodslandscape.jpeg?v=1558716267&w=740&h=416&ffmt=webp&vtcrop=y',
        preview: true
      },
      {
        spotId: 3,
        url: 'https://image.cnbcfm.com/api/v1/image/105932445-1558716242214aispacemarspodsstairs.jpeg?v=1558716390&w=740&h=416&ffmt=webp&vtcrop=y',
        preview: false
      },
      {
        spotId: 3,
        url: 'https://image.cnbcfm.com/api/v1/image/105932448-1558716242215aispacemarspodskitchen.jpeg?v=1558716474&w=740&h=416&ffmt=webp&vtcrop=y',
        preview: false
      },
      {
        spotId: 3,
        url: 'https://image.cnbcfm.com/api/v1/image/105932447-1558716242214aispacemarspodssleepypod.jpeg?v=1558716457&w=740&h=416&ffmt=webp&vtcrop=y',
        preview: false
      },
      {
        spotId: 3,
        url: 'https://image.cnbcfm.com/api/v1/image/105932446-1558716242214aispacemarspodslab.jpeg?v=1558716371&w=740&h=416&ffmt=webp&vtcrop=y',
        preview: false
      },
      {
        spotId: 4,
        url: 'https://loveincorporated.blob.core.windows.net/contentimages/gallery/413ea569-89ac-488d-ad30-5b52a0e4e684-US-Substructures1.jpg',
        preview: true
      },
      {
        spotId: 4,
        url: 'https://loveincorporated.blob.core.windows.net/contentimages/gallery/4c3e857b-5da8-4f80-817f-27fab71c2a4d-US-Substructures4.jpg',
        preview: false
      },
      {
        spotId: 4,
        url: 'https://loveincorporated.blob.core.windows.net/contentimages/gallery/09255f62-f728-4d0f-ac94-b8b9705b93f8-US-Substructures3.jpg',
        preview: false
      },
    ], {})
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = 'SpotImages';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      spotId: { [Op.in]: [1, 2, 3, 4] }
    }, {});
  }
};
