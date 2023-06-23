'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class id_detail_pemesanan extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.kamar_dipesan, {
        foreignKey: "id",
        as: "kamar_dipesan"
      })
      this.belongsTo(models.pemesanan, {
        foreignKey: "pemesanan_id",
        as: "pemesanan"
      })
      this.belongsTo(models.tipe_kamar, {
        foreignKey: "tipe_kamar_id",
        as: "tipe_kamar"
      })
    }
  }
  id_detail_pemesanan.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true
    },
    pemesanan_id: DataTypes.STRING,
    tipe_kamar_id: DataTypes.INTEGER,
    jumlah_kamar: DataTypes.INTEGER,
    total_harga: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'detail_pemesanan',
    tableName: 'detail_pemesanan',
  });
  return id_detail_pemesanan;
};