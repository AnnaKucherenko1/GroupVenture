const {
  Activity,
  UserActivityParticipation,
} = require("../models/associations");
const { responseHandler } = require("../helpers/common");
const { processActivities, processActivity } = require("../helpers/activities");

exports.postActivity = async (req, res) => {
  try {
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

    return responseHandler(res, 200, true, activity, "Activity has been added");
  } catch (err) {
    console.log(err);
    return responseHandler(res, 500, false, null);
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
      return responseHandler(res, 404, false, null, "Activities not found.");
    }

    const processedActivities = processActivities(activities);

    return responseHandler(
      res,
      200,
      true,
      processedActivities,
      "Activities were fetched"
    );
  } catch (err) {
    console.log(err);
    return responseHandler(res, 500, false, null);
  }
};

exports.getActivityInfo = async function (req, res, next) {
  try {
    const activityId = req.params.id;

    if (!activityId) {
      return responseHandler(
        res,
        400,
        false,
        null,
        "ActivityId missing in the request query."
      );
    }

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
      return responseHandler(
        res,
        404,
        false,
        null,
        `Activity with id: ${activityId} not found`
      );
    }

    const newActivity = processActivity(activity);

    return responseHandler(
      res,
      200,
      true,
      newActivity,
      `Activity info fetched`
    );
  } catch (err) {
    console.log(err);
    return responseHandler(res, 500, false, null);
  }
};

exports.deleteActivity = async function (req, res) {
  try {
    const activityId = req.params.id;

    if (!activityId) {
      return responseHandler(
        res,
        400,
        false,
        null,
        "ActivityId missing in the request query."
      );
    }

    const activity = await Activity.destroy({ where: { id: id } });
    return responseHandler(res, 200, true, activity, `Activity info fetched`);
  } catch (err) {
    console.log(err);
    return responseHandler(res, 500, false, null);
  }
};

exports.editActivity = async function (req, res) {
  try {
    const { id, info } = req.body;

    const [numOfAffectedRows, updatedActivity] = await Activity.update(info, {
      where: { id: id },
      returning: true,
    });

    if (numOfAffectedRows === 0) {
      return responseHandler(
        res,
        404,
        false,
        null,
        `Activity with id: ${id} not found`
      );
    }
    return responseHandler(res, 200, true, updatedActivity[0], `Activity has been updated`);
  } catch (err) {
    console.log(err);
    return responseHandler(res, 500, false, null);
  }
};
