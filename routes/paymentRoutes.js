const express = require("express");
const router = express.Router();
const { initiatePayment, paymentSuccess, paymentFailure } = require("../controllers/paymentController");
const protect = require("../middleware/authMiddleware");

router.post("/sslcommerz", protect, initiatePayment);
router.post("/success", paymentSuccess);
router.post("/fail", paymentFailure);

module.exports = router;
