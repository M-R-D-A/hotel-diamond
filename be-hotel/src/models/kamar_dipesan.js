'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class kamar_dipesan extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.detail_pemesanan, {
        foreignKey: "detail_pemesanan_id",
        as: "dipesan_detail_pemesan"
      })
      this.belongsTo(models.kamar, {
        foreignKey: "kamar_id",
        as: "dipesan_kamar"
      })
    }
  }
  kamar_dipesan.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true
    },
    detail_pemesanan_id: DataTypes.INTEGER,
    kamar_id: DataTypes.INTEGER,
    tgl_akses: DataTypes.DATE,
  }, {
    sequelize,
    modelName: 'kamar_dipesan',
    tableName: 'kamar_dipesan',
  });
  return kamar_dipesan;
};