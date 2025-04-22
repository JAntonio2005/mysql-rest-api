require('dotenv').config();  // Cargar las variables de entorno
const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const envConfigs = require('../config/config');  // Configuración de la base de datos

const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = envConfigs[env];  // Cargar configuración dependiendo del entorno
const db = {};

let sequelize;
if (config.url) {
  sequelize = new Sequelize(config.url, config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

// Cargar los modelos desde la carpeta `models`
fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes); // Importa cada modelo
    db[model.name] = model;
  });

// Asociaciones (si existen)
Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

// Sincronizar la base de datos (crear tablas si no existen)
db.sequelize = sequelize;
db.Sequelize = Sequelize;

sequelize.sync({ force: false })  // `force: false` para no eliminar las tablas existentes
  .then(() => {
    console.log('Las tablas han sido sincronizadas');
  })
  .catch(err => {
    console.error('Error al sincronizar las tablas:', err);
  });

module.exports = db;
