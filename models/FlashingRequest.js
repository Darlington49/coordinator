const Sequelize = require("sequelize");

const sequelize = require("../util/database");

const FlashingRequest = sequelize.define("FlashingRequest", {
  
  ProductMacAdress: Sequelize.STRING,
//   FileSystemID: Sequelize.STRING,
//   firmwareID: Sequelize.STRING,
});

module.exports = FlashingRequest;