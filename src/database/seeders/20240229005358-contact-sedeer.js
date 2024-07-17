'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
  
  await queryInterface.bulkInsert('contacts', [{
    phone: 1523678145,
    user_id: 3,
    opcional_number:1123456789,
    createdAt:new Date,
    updatedAt: new Date
    }], {});

  },

  async down (queryInterface, Sequelize) {
  
    await queryInterface.bulkDelete('contacts', null, {});
  
  }
};
