const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize("postgres", "almun", "", {
  host: "localhost",
  dialect: "postgres",
  port: 5432,
  logging: false,
});

module.exports = sequelize;
