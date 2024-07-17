'use strict';
const fs= require('fs')
const path = require("path");
const users =JSON.parse(fs.readFileSync(path.join (__dirname,"../seeders/users.json"), "utf-8"));
const data= users.map(user=>{
    user.birthday= null;
    user.createdAt=new Date;
    user.updatedAt=new Date;
    return user
  }
)
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
      await queryInterface.bulkInsert('users',data, {});
    
  },

  async down (queryInterface, Sequelize) {
  
    
    await queryInterface.bulkDelete('user', null, {});

  }
};
