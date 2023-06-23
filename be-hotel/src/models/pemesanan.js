'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class pemesanan extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.users, {
        foreignKey: "user_id",
        as: "users"
      })
    }
  }
  pemesanan.init({
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
      autoIncrement: false
    },
    nomor_pemesanan: DataTypes.INTEGER,
    nama_pemesan: DataTypes.STRING,
    email_pemesan: DataTypes.STRING,
    tgl_pemesanan: DataTypes.DATE,
    check_in: DataTypes.DATE,
    check_out: DataTypes.DATE,
    nama_tamu: DataTypes.STRING,
    jumlah_kamar: DataTypes.INTEGER,
    status_pemesanan: DataTypes.ENUM('baru', 'check_in', 'check_out'),
    user_id: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'pemesanan',
    tableName: 'pemesanan',
  });
  return pemesanan;
};