const express = require("express");
const protectedRoute = require("../middleware/protectedRoute");
const {
  getCurrentCourseProgressController,
  resetCurrentCourseProgressController,
  markCurrentLectureViewdController,
} = require("../controllers/progressController");

const router = express.Router();

//get current progress of course
router.get(
  "/progress/:studentId/:courseId",
  protectedRoute,
  getCurrentCourseProgressController
);

//mark lecture as viewd
router.post(
  "/mark-lecture-viewed",
  protectedRoute,
  markCurrentLectureViewdController
);

//reset-progress
router.post(
  "/reset-progress",
  protectedRoute,
  resetCurrentCourseProgressController
);
module.exports = router;
