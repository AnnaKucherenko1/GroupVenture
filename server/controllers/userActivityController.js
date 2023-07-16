const { UserActivityParticipation } = require("../models/associations");


exports.joinParticipant = async (req, res, next) => {
  try {
    const { userId, activityId } = req.body;

    await UserActivityParticipation.create({
      userId,
      activityId,
    });

    return responseHandler(
      res,
      200,
      true,
      null,
      `User has joined the activity`
    );
  } catch (error) {
    console.error(`Falied to join participant: ${error.message}`);
    return responseHandler(res, 500, false, null);
  }
};

exports.leaveParticipant = async (req, res) => {
  try {
    const { userId, activityId } = req.body;

    await UserActivityParticipation.destroy({
      where: {
        userId: userId,
        activityId: activityId,
      },
    });

    return responseHandler(
      res,
      200,
      true,
      null,
      `User has left the activity`
    );
  } catch (error) {
    console.error(`Falied to leave participant: ${error.message}`);
    return responseHandler(res, 500, false, null);
  }
};
