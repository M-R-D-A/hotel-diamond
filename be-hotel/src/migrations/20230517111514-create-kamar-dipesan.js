'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('kamar_dipesan', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      detail_pemesanan_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "detail_pemesanan",
          key: "id"
        }
      },
      kamar_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "kamar",
          key: "id"
        }
      },
      tgl_akses: {
        type: Sequelize.DATE
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
    await queryInterface.dropTable('kamar_dipesan');
  }
};