const { DataTypes } = require("sequelize");
const sequelize = require("./modelDB");

const UserActivityParticipation = sequelize.define(
  "UserActivityParticipation",
  {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    activityId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    indexes: [
      {
        unique: true,
        fields: ["userId", "activityId"],
      },
    ],
  }
);

module.exports = UserActivityParticipation;
