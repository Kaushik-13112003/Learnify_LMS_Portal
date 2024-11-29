const express = require("express");
const protectedRoute = require("../middleware/protectedRoute");
const {
  updateProfileController,
  forgotPasswordController,
  resetPasswordController,
  getMyCoursesController,
} = require("../controllers/userController");

const router = express.Router();

//update-profile
router.put("/update-profile", protectedRoute, updateProfileController);

//forgot-password
router.post("/forgot-password", protectedRoute, forgotPasswordController);

//reset-password
router.post("/reset-password/:token", protectedRoute, resetPasswordController);

//my-courses
router.get("/my-courses/:id", protectedRoute, getMyCoursesController);

module.exports = router;
