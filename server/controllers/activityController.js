const {
  Activity,
  UserActivityParticipation,
} = require("../models/associations");

exports.postActivity = async (req, res) => {
  const {
    title,
    date,
    meetingPoint,
    coordinates,
    typeOfActivity,
    aboutActivity,
    spots,
    telegramLink,
    createdBy,
  } = req.body;
  try {
    const activity = await Activity.create({
      title,
      date,
      meetingPoint,
      coordinates,
      typeOfActivity,
      aboutActivity,
      spots,
      telegramLink,
      createdBy,
    });
    res.status(201).json(activity);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
};

exports.getActivities = async (req, res, next) => {
  try {
    const activities = await Activity.findAll({
      include: [
        {
          model: UserActivityParticipation,
          attributes: ["userId"],
        },
      ],
    });

    if (!activities) {
      res.status(404).json({
        success: false,
        data: null,
        message: "Activities not found.",
      });
      return next();
    }

    const processedActivities = activities.map((activity) => {
      participations = activity.dataValues.UserActivityParticipations.map(
        (participation) => participation.userId
      );

      const newActivity = Object.assign({}, activity.dataValues);
      newActivity.UserActivityParticipations = participations;

      return newActivity;
    });

    res.status(200).json({
      success: true,
      data: processedActivities,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getActivityInfo = async function (req, res) {
  try {
    let activity = await Activity.findOne({ where: { id: req.params.id } });

    res.status = 200;
    res.json(activity);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
};
