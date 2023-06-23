'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class kamar extends Model {
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
      this.hasMany(models.kamar_dipesan, {
        foreignKey: "id",
        as: "kamar_dipesan"
      })
    }
  }
  kamar.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true
    },
    nomor: DataTypes.INTEGER,
    tipe_kamar_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'kamar',
    tableName: 'kamar',
  });
  return kamar;
};