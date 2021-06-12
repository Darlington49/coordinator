const Sequelize = require("sequelize");

const sequelize = require("../util/database");

const Firmware = sequelize.define("Firmware", {
  
  Compiled_Date: Sequelize.STRING, //DATE
  Version: Sequelize.STRING,
  RepositoryURL: Sequelize.STRING,
  Name: Sequelize.STRING,
  Link: Sequelize.STRING,
});

module.exports = Firmware;
