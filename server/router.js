const router = require("express").Router();
const authMiddleware = require("./middleware/auth");
const {
  usersController,
  activityController,
  userActivityController,
} = require("./controllers/indexController");

// User
router.post('/signup', usersController.postUser);
router.post('/login', usersController.login);
router.post('/logout', usersController.logout);
router.get('/profile/:id', usersController.getUserInfo);
router.get('/profile/:id', authMiddleware, usersController.getUserInfo);
router.patch('/profile/edit/:id', usersController.editUser);

// Activity
router.post('/addactivity', activityController.postActivity);
router.get('/activities', activityController.getActivities);
router.get('/activity/:id', activityController.getActivityInfo);
router.delete('/delete/:id', activityController.deleteActivity);
router.put('/editactivity/:id', activityController.editActivity);

// User activity
router.post('/activities/join', userActivityController.joinParticipant);
router.post('/activities/leave', userActivityController.leaveParticipant);

module.exports = router;
