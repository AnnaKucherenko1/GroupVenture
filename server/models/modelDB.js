const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize("GroupVenture", "postgres", "", {
  host: "localhost",
  dialect: "postgres",
  port: 5433,
  logging: false,
});

module.exports = sequelize;
