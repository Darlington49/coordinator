const Sequelize = require("sequelize");

var sequelize = new Sequelize(
  "postgres://postgres:postgres@localhost:5432/Coordinator"
);

module.exports = sequelize;
