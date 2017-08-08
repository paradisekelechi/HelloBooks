'use strict';

import fs from 'fs';
import path from 'path';
import Sequelize from 'sequelize';
import dbConfig from '../config/config.json';
const basename  = path.basename(module.filename);
const env       = process.env.NODE_ENV || 'development';
const config    = dbConfig[env];
const db        = {};

const sequelize = new Sequelize(config.database, config.username, config.password, config);

fs
  .readdirSync(__dirname)
  .filter((file) => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach((file) => {
    let model = sequelize['import'](path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }

  //sequelize.sync({force: true});
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
