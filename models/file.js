const Sequelize = require("sequelize");

const sequelize = require("../util/database");

const File = sequelize.define("file", {
  type: {
    type: Sequelize.STRING,
  },
  name: {
    type: Sequelize.STRING,
  },
  data: {
    type: Sequelize.BLOB("long"),
  },
});

module.exports = File;
