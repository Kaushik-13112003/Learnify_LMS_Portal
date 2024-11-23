const express = require("express");
const router = express.Router();
const protectedRoute = require("../middleware/protectedRoute");
const {
  filterCoursesController,
} = require("../controllers/studentsController");

//get-all-student-view-course
router.get("/filter-courses", protectedRoute, filterCoursesController);

module.exports = router;
