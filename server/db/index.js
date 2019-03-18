const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const config = require('../config');

let db = null;

// Singleton Pattern to guarantee only one db's instance
module.exports = () => {
  if (!db) {
    const sequelize = new Sequelize(config.db, config.dbUser, config.dbPwd, {
      dialect: 'postgres',
      logging: false,
    });

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

  return db;
};
