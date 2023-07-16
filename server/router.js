const router = require("express").Router();
const authMiddleware = require("./middleware/auth");
const {
  usersController,
  activityController,
  userActivityController,
} = require("./controllers/indexController");
const {
  requestValidationMiddleware,
  postActivityRequestValidator,
  editActivityRequestValidator,
  joinAndLeaveActivityRequestValidator,
  loginRequestValidator,
  createUserRequestValidator,
  updateUserRequestValidator
} = require("./middleware/validator.js");

// User
router.post("/signup", createUserRequestValidator,  requestValidationMiddleware, usersController.postUser);
router.post(
  "/login",
  loginRequestValidator,
  requestValidationMiddleware,
  usersController.login
);
router.post("/logout", usersController.logout);
router.get("/profile/:id", usersController.getUserInfo);
router.patch("/profile/edit", updateUserRequestValidator,  requestValidationMiddleware, usersController.editUser);

// Activity
router.post(
  "/addactivity",
  postActivityRequestValidator,
  requestValidationMiddleware,
  activityController.postActivity
);
router.get("/activities", activityController.getActivities);
router.get("/activity/:id", activityController.getActivityInfo);
router.delete("/delete/:id", authMiddleware, activityController.deleteActivity);
router.put(
  "/editactivity",
  authMiddleware,
  editActivityRequestValidator,
  requestValidationMiddleware,
  activityController.editActivity
);
// User activity
router.post(
  "/activities/join",
  authMiddleware,
  joinAndLeaveActivityRequestValidator,
  requestValidationMiddleware,
  userActivityController.joinParticipant
);
router.post(
  "/activities/leave",
  authMiddleware,
  joinAndLeaveActivityRequestValidator,
  requestValidationMiddleware,
  userActivityController.leaveParticipant
);

module.exports = router;
