const express = require("express");
const router = express.Router();
const { getRecommendedProduct } = require("../controllers/recommendationController");

router.get("/:userId", getRecommendedProduct);

module.exports = router;
