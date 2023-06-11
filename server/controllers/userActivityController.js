const { UserActivityParticipation } = require("../models/associations");

// exports.updateParticipants = async (req, res) => {
//   try {
//     const { userId, activityId } = req.body;
//     const existingActivity = await UserActivityParticipation.findOne({
//       where: { activityId: activityId },
//     });

//     if (existingActivity) {
//       const updatedActivity = await existingActivity.update({
//         participants: [...existingActivity.participants, userId],
//       });

//       res.status(201).json({
//         success: true,
//         data: updatedActivity,
//         message: "Updated participants for existing activity.",
//       });
//     } else {
//       const newActivity = await UserActivityParticipation.create({
//         activityId: activityId,
//         participants: [userId],
//       });

//       res.status(201).json({
//         success: true,
//         data: newActivity,
//         message: "Added new activity with participants.",
//       });
//     }
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: error.message });
//   }
// };

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

    // Deletes if the row exist , ignores if it does not
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
