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
        spotId: 1,
        url: 'https://www.wallpaperup.com/uploads/wallpapers/2016/12/09/1063747/7ed69a8a5ee46edf44c2d7800989a753-700.jpg',
        preview: false
      },
      {
        spotId: 1,
        url: 'https://www.worldatlas.com/r/w1200/upload/7a/f8/f7/lost-city-of-atlantis.jpg',
        preview: false
      },
      {
        spotId: 1,
        url: 'https://www.telegraph.co.uk/multimedia/archive/01848/atlantis_1848106c.jpg?imwidth=960',
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
      {
        spotId: 4,
        url: 'https://loveincorporated.blob.core.windows.net/contentimages/gallery/a1131618-d57c-4d14-8398-48a267672b96-US-Substructures2.jpg',
        preview: false
      },
      {
        spotId: 4,
        url: 'https://loveincorporated.blob.core.windows.net/contentimages/gallery/2959aefe-7764-4b47-9e52-77f7746ebf86-floating-seashorse-original-edition-underwater-homes-3.jpg',
        preview: false
      },
      {
        spotId: 5,
        url: 'https://cdn.mos.cms.futurecdn.net/EbCbbH2DSaivokkDuqk6cm.png',
        preview: true
      },
      {
        spotId: 5,
        url: 'https://data1.ibtimes.co.in/en/full/522533/moonhouse-you-tube-screen-shot-moonhouse.png?w=617&l=50&t=40',
        preview: false
      },
      {
        spotId: 5,
        url: 'https://images.squarespace-cdn.com/content/v1/5d41f82684370e0001f5df35/1593459793183-QZDIHURR455DMAHFXUWJ/Screen+Shot+2020-06-29+at+3.42.30+PM.png',
        preview: false
      },
      {
        spotId: 5,
        url: 'https://economictimes.indiatimes.com/thumb/msid-70212700,width-1200,height-900,resizemode-4,imgsize-245364/view-what-the-moon-mission-told-us-about-earth.jpg',
        preview: false
      },
      {
        spotId: 5,
        url: 'https://i.pinimg.com/736x/5e/33/de/5e33de29a9f2cf6b62971ff145e0f874--one-room-cabins-small-cabins.jpg',
        preview: false
      },
      {
        spotId: 6,
        url: 'https://img.huffingtonpost.com/asset/56e2fd9f1e0000b300703d7e.jpeg',
        preview: true
      },
      {
        spotId: 6,
        url: 'https://img.huffingtonpost.com/asset/56e2ff171e0000950070fd36.jpeg',
        preview: false
      },
      {
        spotId: 6,
        url: 'https://theluxurytravelexpert.com/wp-content/uploads/2022/06/header.jpg',
        preview: false
      },
      {
        spotId: 6,
        url: 'https://www.travelandleisure.com/thmb/fNXwq7eXxnCE0vfYU6F9ShOcYA4=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/atlantis-the-palm-underwater-bathroom-WATERHOTEL0120-a09e43dbc6fd49b2b3f36b116d7fcc64.jpg',
        preview: false
      },
      {
        spotId: 6,
        url: 'https://www.luxxu.net/blog/wp-content/uploads/2020/02/featured-image-5.jpg',
        preview: false
      },
    ], {})
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = 'SpotImages';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      spotId: { [Op.in]: [1, 2, 3, 4, 5] }
    }, {});
  }
};
