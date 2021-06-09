const Sequelize = require("sequelize");

const sequelize = require("../util/database");

const Filesystem = sequelize.define("Filesystem", {
  Compiled_Date: Sequelize.STRING, //DATE
  Version: Sequelize.STRING,
  RepositoryURL: Sequelize.STRING,
});

module.exports = Filesystem;
