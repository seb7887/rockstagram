const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const config = require('../config');

let db = null;

// Singleton Pattern for db

// To connect create database in Postgres
// sudo -u postgres createuser owning_user
// sudo -u postgres createdb -O owning_user dbname
module.exports = () => {
  if (!db) {
    const sequelize = new Sequelize(
      config.db,
      config.dbUser,
      config.dbPwd,
      {
        dialect: 'postgres'
      }
    );

    db = {};

    const dir = path.join(__dirname, 'models');
    fs.readdirSync(dir).filter(file => {
      const modelDir = path.join(dir, file);
      const model = sequelize.import(modelDir);
      db[model.name] = model;
    });

    Object.keys(db).forEach(modelName => {
      if (db[modelName].associate) {
        db[modelName].associate(db);
      }
    });

    db.sequelize = sequelize;
    db.Sequelize = Sequelize;
  }

  console.log('Hola');
  return db;
};
