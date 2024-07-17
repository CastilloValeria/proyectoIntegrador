'use strict';
const fs= require('fs')
const path = require("path");
const brands =JSON.parse(fs.readFileSync(path.join (__dirname,"../seeders/brand.json"), "utf-8"));
const data= brands.map(product=>{
  product.createdAt=new Date;
  product.updatedAt=new Date;
  return product
  }
)
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

    await queryInterface.bulkInsert('brands',data, {});
    
  },

  async down (queryInterface, Sequelize) {

  await queryInterface.bulkDelete('brands', null, {});

  }
};
