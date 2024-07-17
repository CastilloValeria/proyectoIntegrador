'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Products', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      titulo:{
        type: Sequelize.STRING,
        allowNull: false
      },
      discount: {
        type: Sequelize.INTEGER,
      },
      price: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      brand_id: {
        type: Sequelize.INTEGER,
        references: {
          model:{
            tableName:'Brands'},
          key:'id'
        }
      },
      description: {
        type: Sequelize.JSON,
        allowNull: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Products');
  }
};