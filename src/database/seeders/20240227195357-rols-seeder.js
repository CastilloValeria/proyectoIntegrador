'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

    //  * Add seed commands here.

  await queryInterface.bulkInsert('rols', [{
        name: 'admin',
        createdAt:new Date,
        upDatedAt:new Date,
      },
    {
        name: 'user',
        createdAt:new Date,
        upDatedAt:new Date,
    }], {});
  
  },

  async down (queryInterface, Sequelize) {
    // cuidado esto borra todo.
      await queryInterface.bulkDelete('rols', null, {});
  }
};
