
const Sequelize = require("sequelize");

const sequelize = require("../util/database");

const ControllerLog = sequelize.define("ControllerLog", {
  
  status: Sequelize.STRING,
  rootcause: Sequelize.STRING,
  log: Sequelize.TEXT,
  Time: Sequelize.STRING, //DATE
});

module.exports = ControllerLog;