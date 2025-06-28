const express = require("express");
const router = express.Router();
const { initiatePayment, paymentSuccess, paymentFailure } = require("../controllers/paymentController");
const protect = require("../middleware/authMiddleware");

router.post("/sslcommerz", protect, initiatePayment);
router.post("/success", paymentSuccess); // for POST
router.get("/success", paymentSuccess);  // for GET

router.post("/fail", paymentFailure);

module.exports = router;
