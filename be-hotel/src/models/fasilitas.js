'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class fasilitas extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.tipe_kamar, {
        foreignKey: "tipe_kamar_id",
        as: "tipe_kamar"
      })
    }
  }
  fasilitas.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true
    },
    tipe_kamar_id: DataTypes.INTEGER,
    kasur: DataTypes.INTEGER,
    free_meal: DataTypes.INTEGER,
    wifi: DataTypes.BOOLEAN,
    ac: DataTypes.BOOLEAN,
    pemanas: DataTypes.BOOLEAN,
    tv: DataTypes.BOOLEAN,
    alat_mandi: DataTypes.BOOLEAN,
  }, {
    sequelize,
    modelName: 'fasilitas',
    tableName: 'fasilitas',
  });
  return fasilitas;
};