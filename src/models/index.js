const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const config = require('../config/database.js')[process.env.NODE_ENV || 'development'];

const basename = path.basename(module.filename);

const db = {};

const sequelize = config.use_env_variable
  ? new Sequelize(process.env[config.use_env_variable], config)
  : new Sequelize(config);

const pageSize = 24;

sequelize.Model.findAllPaged = async function findAllPaged(options, page) {
  const newOptions = {
    ...options,
    offset: (page - 1) * pageSize,
    limit: pageSize + 1,
  };
  const result = await this.findAll(newOptions);
  result.isLastPage = result.length <= pageSize;
  result.splice(pageSize, 1);
  return result;
};

fs
  .readdirSync(__dirname)
  .filter(file => file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js')
  .forEach((file) => {
    const model = sequelize.import(path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
