'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('adresses', [{
      street: 'jujuju ',
      number: '1234 ' ,
      city:'san mikel ',
      country:'Argentina ',
      zip_code:'1234 ',
      apart_number: '12 ',
      createdAt:new Date,
      updatedAt: new Date,
      }], {});

  },

  async down (queryInterface, Sequelize) {

    await queryInterface.bulkDelete('adresses', null, {});
    
  }
};
