const Sequelize = require("sequelize");

var sequelize = new Sequelize(
  "postgres://postgres:postgres@192.168.1.5:5432/Coordinator"
);

module.exports = sequelize;
