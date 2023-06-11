const User = require("./user");
const Activity = require("./activity");
const UserActivityParticipation = require("./userActivityParticipation");

User.hasMany(Activity, {
  foreignKey: "createdBy",
});

User.belongsToMany(Activity, {
  through: UserActivityParticipation,
  foreignKey: "userId",
});

Activity.belongsTo(User, {
  foreignKey: "createdBy",
});
Activity.belongsToMany(User, {
  through: UserActivityParticipation,
  foreignKey: "activityId",
});
Activity.hasMany(UserActivityParticipation, {
  foreignKey: "activityId",
});

// UserActivityParticipation.belongsTo(Activity, {
//   foreignKey: "activityId",
// });

module.exports = { User, Activity, UserActivityParticipation };
