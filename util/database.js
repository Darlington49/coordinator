const Sequelize = require("sequelize");
/*
var sequelize = new Sequelize(
  "postgres://postgres:postgres@localhost:5432/Coordinator"
);*/
const sequelize = new Sequelize('Coordinator', 'postgres', 'postgres', {
  // host: 'postgres',  // name of the container
  // host: '192.168.174.4',  // name of the container
  host: '68.183.56.192',
  //host: 'localhost',  // name of the container
  dialect: 'postgres' 
});
module.exports = sequelize;
