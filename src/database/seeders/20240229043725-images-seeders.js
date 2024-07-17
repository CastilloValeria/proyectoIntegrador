'use strict';
const fs= require('fs')
const path = require("path");
const products =JSON.parse(fs.readFileSync(path.join (__dirname,"../seeders/images.json"), "utf-8"));
const data= products.map(product=>{
  product.createdAt=new Date;
  product.updatedAt=new Date;
  return product
  }
)
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
  
      await queryInterface.bulkInsert('Images', data, {});

  },

  async down (queryInterface, Sequelize) {
  
    await queryInterface.bulkDelete('images', null, {});
  }
};
