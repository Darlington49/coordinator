
const Sequelize = require("sequelize");

const sequelize = require("../util/database");

const ControllerLog = sequelize.define("ControllerLog", {
  
  status: Sequelize.STRING,
  Time: Sequelize.STRING, //DATE
});

module.exports = ControllerLog;