const router = require("express").Router();
const authMiddleware = require("./middleware/auth");
const {
  usersController,
  activityController,
  userActivityController,
} = require("./controllers/indexController");

// router.get("/events", eventController.getEvents);
router.post("/addactivity", activityController.postActivity);
router.post("/signup", usersController.postUser);
router.get("/profile/:id", usersController.getUserInfo);
router.get("/profile/:id", usersController.getUsersByIds);
router.get("/activities", activityController.getActivities);
router.get("/:id", activityController.getActivityInfo);
router.post("/login", usersController.login);
router.post("/logout", usersController.logout);
router.post("/activities/join", userActivityController.joinParticipant);
router.post("/activities/leave", userActivityController.leaveParticipant);
module.exports = router;
