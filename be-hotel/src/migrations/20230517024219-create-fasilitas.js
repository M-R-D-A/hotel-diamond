'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('fasilitas', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      tipe_kamar_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references:{
          model:"tipe_kamar",
          key:"id"
        }
      },
      kasur: {
        type: Sequelize.INTEGER
      },
      free_meal: {
        type: Sequelize.INTEGER
      },
      wifi: {
        type: Sequelize.BOOLEAN
      },
      ac: {
        type: Sequelize.BOOLEAN
      },
      pemanas: {
        type: Sequelize.BOOLEAN
      },
      tv: {
        type: Sequelize.BOOLEAN
      },
      alat_mandi: {
        type: Sequelize.BOOLEAN
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
    await queryInterface.dropTable('fasilitas');
  }
};