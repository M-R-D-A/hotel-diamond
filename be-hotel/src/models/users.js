'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.pemesanan, {
        foreignKey: "id",
        as: "pemesanan"
      })
    }
  }
  users.init({
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
      autoIncrement: false
    },
    nama: {
      type: DataTypes.STRING
    },
    password: {
      type: DataTypes.STRING
    },
    role: {
      type: DataTypes.STRING
    },
    email: {
      type: DataTypes.STRING
    },
    foto: {
      type: DataTypes.STRING
    },
    kontak: {
      type: DataTypes.STRING
    },
  }, {
    sequelize,
    modelName: 'users',
    tableName: 'users',
  });
  return users;
};