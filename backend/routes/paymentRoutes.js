const express = require("express");
const protectedRoute = require("../middleware/protectedRoute");
const {
  makePurchaseController,
  getPaymentController,
} = require("../controllers/purchaseController");

const router = express.Router();

//make-payment
router.post("/make-payment", protectedRoute, makePurchaseController);

//get-payment
router.post("/get-payment", protectedRoute, getPaymentController);

module.exports = router;
