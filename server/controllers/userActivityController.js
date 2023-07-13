const { UserActivityParticipation } = require("../models/associations");


exports.joinParticipant = async (req, res, next) => {
  try {
    const { userId, activityId } = req.body;
    if (!userId || !activityId) {
      res.status(404).json({
        success: false,
        data: null,
        message: "Bad request.",
      });
      return next();
    }

    await UserActivityParticipation.create({
      userId,
      activityId,
    });

    res.status(200).json({
      success: true,
      data: null,
      message: "User joined the activity.",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

exports.leaveParticipant = async (req, res) => {
  try {
    const { userId, activityId } = req.body;

    if (!userId || !activityId) {
      res.status(404).send({
        success: false,
        data: null,
        message: "Bad request.",
      });
      return;
    }

    await UserActivityParticipation.destroy({
      where: {
        userId: userId,
        activityId: activityId,
      },
    });

    res.status(200).json({
      success: true,
      data: null,
      message: "User left the activity.",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};
