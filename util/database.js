const Sequelize = require("sequelize");

var sequelize = new Sequelize(
  "postgres://postgres:postgres@0.0.0.0:5432/Coordinator"
);

module.exports = sequelize;
