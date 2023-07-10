const { Sequelize, DataTypes } = require("sequelize");


const {NODE_ENV, PROD_DB} = process.env;
console.log("NODE_ENV & PROD_DB ==> ", NODE_ENV, PROD_DB)
const sequelize = NODE_ENV==="production" ? new Sequelize(PROD_DB) :  new Sequelize("postgres", "almun", "", {
  host: "localhost",
  dialect: "postgres",
  port: 5432,
  logging: false,
});

module.exports = sequelize;
