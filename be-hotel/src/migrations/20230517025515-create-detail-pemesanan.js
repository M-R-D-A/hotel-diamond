'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('detail_pemesanan', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      pemesanan_id: {
        type: Sequelize.STRING,
        allowNull: false,
        references: {
          model: "pemesanan",
          key: "id"
        }
      },
      tipe_kamar_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "tipe_kamar",
          key: "id"
        }
      },
      jumlah_kamar: {
        type: Sequelize.INTEGER
      },
      total_harga: {
        type: Sequelize.STRING
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
    await queryInterface.dropTable('detail_pemesanan');
  }
};