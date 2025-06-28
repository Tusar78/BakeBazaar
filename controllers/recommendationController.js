const Product = require("../models/Product");
const Order = require("../models/Order");

const getRecommendedProduct = async (req, res) => {
  try {
    const userId = req.params.userId;

    // Get all orders by this user
    const orders = await Order.find({ user: userId });

    // Count product frequency
    const productMap = {};

    orders.forEach(order => {
      order.items.forEach(item => {
        if (!productMap[item.productId]) {
          productMap[item.productId] = 0;
        }
        productMap[item.productId] += item.quantity;
      });
    });

    // Get all products
    const allProducts = await Product.find();

    // Add a simple regression-like scoring system
    const scoredProducts = allProducts.map(p => {
      const orderFreq = productMap[p._id] || 0;
      const score = (p.rating * 2) + (p.smellScore * 0.5) + (orderFreq * 3);
      return { ...p._doc, preferenceScore: score };
    });

    // Sort by preferenceScore
    scoredProducts.sort((a, b) => b.preferenceScore - a.preferenceScore);

    const bestProduct = scoredProducts[0];
    res.status(200).json(bestProduct);
  } catch (err) {
    console.error("Recommendation error:", err);
    res.status(500).json({ message: "Failed to recommend", error: err.message });
  }
};

module.exports = { getRecommendedProduct };
