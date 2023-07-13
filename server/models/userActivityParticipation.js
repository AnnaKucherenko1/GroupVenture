const { DataTypes } = require("sequelize");
const sequelize = require("./modelDB");
const Sequelize = require("sequelize")

const UserActivityParticipation = sequelize.define(
  "UserActivityParticipation",
  {
    userId: {
      type: Sequelize.UUID,
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
