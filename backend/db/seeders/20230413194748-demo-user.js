'use strict';
const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = 'Users';
    return queryInterface.bulkInsert(options, [
      {
        email: 'user1@user.io',
        firstName: 'King',
        lastName: 'Triton',
        username: 'Demo-lition',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        email: 'user2@user.io',
        firstName: 'Mark',
        lastName: 'Watney',
        username: 'marsman21',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        email: 'user3@user.io',
        firstName: 'Moana',
        lastName: 'Waialiki',
        username: 'moana',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        email: 'user4@user.io',
        firstName: 'Asterius',
        lastName: 'Eva',
        username: 'asterius',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        email: 'user5@user.io',
        firstName: 'Derdriu',
        lastName: 'Suraya',
        username: 'derdriu',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        email: 'user6@user.io',
        firstName: 'Maya',
        lastName: 'Ninfa',
        username: 'maya',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        email: 'user7@user.io',
        firstName: 'Rikki',
        lastName: 'Sofia',
        username: 'rikki',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        email: 'user8@user.io',
        firstName: 'Halima',
        lastName: 'Jorun',
        username: 'halima',
        hashedPassword: bcrypt.hashSync('password')
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = 'Users';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      username: { [Op.in]: ['Demo-lition', 'marsman21', 'moana', 'asterius', 'derdriu', 'maya', 'rikki', 'halima'] }
    }, {});
  }
};
