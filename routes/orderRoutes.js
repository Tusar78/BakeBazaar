// const express = require("express");
// const router = express.Router();
// const { placeOrder, getOrders } = require("../controllers/orderController");
// const protect = require("../middleware/authMiddleware");
// const adminOnly = require("../middleware/adminMiddleware");
// const { getAllOrders } = require("../controllers/orderController");
// const { updateOrderStatus } = require("../controllers/orderController");

// // Place Order (POST)
// router.post("/place", protect, placeOrder);

// // Get User Orders (GET)
// router.get("/", protect, getOrders);

// // router.get("/all", protect, adminOnly, getAllOrders);
// router.get("/all", protect, adminOnly, async (req, res) => {
//   try {
//     const orders = await Order.find();
//     res.json(orders);
//   } catch (error) {
//     res.status(500).json({ message: "Server Error", error });
//   }
// });

// router.put("/update/:id", protect, adminOnly, updateOrderStatus);

// module.exports = router;

const express = require("express");
const router = express.Router();
const {
  placeOrder,
  getOrders,
  getAllOrders,
  updateOrderStatus,
  getOrderById,
  getVendorOrders, 
} = require("../controllers/orderController");
const protect = require("../middleware/authMiddleware");
const adminOnly = require("../middleware/adminMiddleware");
const Order = require("../models/Order");

// Place Order
router.post("/place", protect, placeOrder);

// Get Orders for a User
router.get("/", protect, getOrders);

// Get All Orders (For Admin)
router.get("/all", protect, getAllOrders);

// GET /api/orders/vendor
// router.get("/vendor", protect, async (req, res) => {
//   try {
//     const vendorId = req.user._id;
//     const orders = await Order.find({ "items.createdBy": vendorId });
//     res.json(orders);
//   } catch (error) {
//     res.status(500).json({ message: "Server Error", error });
//   }
// });

router.get("/vendor", protect, getVendorOrders);

// Update Order Status
router.put("/update/:id", protect, updateOrderStatus);
// Get Order by ID
router.get("/get/:id", protect, getOrderById);
module.exports = router;
