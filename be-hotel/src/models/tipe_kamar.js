'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class tipe_kamar extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.kamar, {
        foreignKey: "id",
        as: "kamar"
      })
      this.hasMany(models.fasilitas, {
        foreignKey: "id",
        as: "fasilitas"
      })
    }
  }
  tipe_kamar.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true
    },
    nama: DataTypes.STRING,
    harga: DataTypes.STRING,
    deskripsi: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'tipe_kamar',
    tableName: 'tipe_kamar',
  });
  return tipe_kamar;
};