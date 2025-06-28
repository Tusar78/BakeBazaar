const Review = require("../models/Review");
const Order = require("../models/Order");
const Product = require("../models/Product");

const addReview = async (req, res) => {
  
  try {
    const { productId, rating, smellScore, comment } = req.body;

    const userId = req.user._id;
    // ✅ check if this product is delivered for this user
    const order = await Order.findOne({
      user: userId,
      "items.productId": productId,
      status: "Delivered",
    });

    if (!order) {
      return res.status(403).json({
        message: "You can only review a product after it's delivered.",
      });
    }

    // ✅ create review
    const review = new Review({
      user: req.user._id,
      product: productId,
      rating,
      smellScore,
      comment,
    });

    await review.save();

    // ✅ update product's rating, smellScore, reviewCount
    const reviews = await Review.find({ product: productId });

    const avgRating =
      reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length;
    const avgSmell =
      reviews.reduce((acc, r) => acc + r.smellScore, 0) / reviews.length;

    const product = await Product.findById(productId);
    product.rating = avgRating;
    product.smellScore = avgSmell;
    product.orderCount = reviews.length;
    await product.save();

    res.status(201).json({ message: "Review submitted!" });
  } catch (err) {
    console.error("Review error:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

module.exports = { addReview };
