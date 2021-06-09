const Sequelize = require("sequelize");

const sequelize = require("../util/database");

const ProductTypes = sequelize.define("ProductTypes", {
  ProductName: Sequelize.STRING,
  // FilesystemId: Sequelize.INTEGER,
  // FirmwareId: Sequelize.INTEGER,
});

module.exports = ProductTypes;
