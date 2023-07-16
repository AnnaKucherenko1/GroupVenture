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
} = require("./middleware/validator.js");

// User
router.post("/signup", usersController.postUser);
router.post("/login", usersController.login);
router.post("/logout", usersController.logout);
router.get("/profile/:id", usersController.getUserInfo);
router.get("/profile/:id", authMiddleware, usersController.getUserInfo);
router.patch("/profile/edit/:id", usersController.editUser);

// Activity
router.post(
  "/addactivity",
  authMiddleware,
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
