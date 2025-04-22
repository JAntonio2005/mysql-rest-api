'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      // Definir asociaciones si es necesario
    }
  }

  // Definir el modelo
  User.init({
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    age: DataTypes.INTEGER,
    comments: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'User',  // Nombre del modelo
  });

  return User;
};
