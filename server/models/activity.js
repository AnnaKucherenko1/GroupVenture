const { DataTypes } = require("sequelize");
const sequelize = require("./modelDB");

const Activity = sequelize.define("Activity", {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  createdBy: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  date: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  meetingPoint: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  coordinates: {
    type: DataTypes.JSON,
    allowNull: false,
  },
  typeOfActivity: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  aboutActivity: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  spots: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  telegramLink: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = Activity;
