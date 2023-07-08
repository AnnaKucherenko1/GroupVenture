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

exports.getActivityInfo = async function (req, res, next) {
  try {
    const activityId = req.params.id;

    const activity = await Activity.findOne({
      where: { id: activityId },
      include: [
        {
          model: UserActivityParticipation,
          attributes: ["userId"],
        },
      ],
    });

    if (!activity) {
      res.status(404).json({
        success: false,
        data: null,
        message: "Activities not found.",
      });
      return next();
    }

    const participations = activity.dataValues.UserActivityParticipations.map(
      (participation) => participation.userId
    );
    const newActivity = Object.assign({}, activity.dataValues);
    newActivity.UserActivityParticipations = participations;

    res.status(200).json(newActivity);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
};

exports.deleteActivity = async function (req, res) {
  try {
    const id = req.params.id;
    if (!id)
      res.status(400).json({
        success: false,
        data: id,
        message: "wrong id",
      });
    let activity = await Activity.destroy({ where: { id: id } });
    res.json(activity);
  } catch (error) {
    console.log(error);
    res.status(400).send(error.message);
  }
};

exports.editActivity = async function (req, res) {
  const { id, info } = req.body;
  try {
    const rowsAffected = await Activity.update(info, { where: { id: id } });
    const actUpdated = await Activity.findByPk(id);
    res.status = 200;
    res.json(actUpdated);
  } catch (err) {
    console.log(err);
    res.status = 500;
    res.body = err.message;
  }
};
