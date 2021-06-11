const Sequelize = require("sequelize");
/*
var sequelize = new Sequelize(
  "postgres://postgres:postgres@localhost:5432/Coordinator"
);*/
const sequelize = new Sequelize('Coordinator', 'postgres', 'postgres', {
  host: '192.168.205.4',  // name of the container
  dialect: 'postgres' 
});
module.exports = sequelize;
