exports.processActivities = (activities) =>
  activities.map((activity) => {
    participations = activity.dataValues.UserActivityParticipations.map(
      (participation) => participation.userId
    );

    const newActivity = Object.assign({}, activity.dataValues);
    newActivity.UserActivityParticipations = participations;

    return newActivity;
  });

exports.processActivity = (activity) => {
  const participations = activity.dataValues.UserActivityParticipations.map(
    (participation) => participation.userId
  );

  const newActivity = Object.assign({}, activity.dataValues);
  newActivity.UserActivityParticipations = participations;

  return newActivity;
};
