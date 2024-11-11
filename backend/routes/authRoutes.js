const express = require("express");
const {
  registerController,
  loginController,
  logoutController,
  getAuthenticatedUserController,
} = require("../controllers/authControllers");
const protectedRoute = require("../middleware/protectedRoute");

const router = express.Router();

//register
router.post("/register", registerController);

//login
router.post("/login", loginController);

// //logout
router.post("/logout", logoutController);

// //get-auth-user
router.get("/get-auth-user", protectedRoute, getAuthenticatedUserController);

module.exports = router;
