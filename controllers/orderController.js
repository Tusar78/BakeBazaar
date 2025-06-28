const Order = require("../models/Order");

const Product = require("../models/Product");

// const placeOrder = async (req, res) => {
//   try {
//     const { items, totalPrice } = req.body;
//     const newOrder = new Order({ user: req.user._id, items, totalPrice });
//     await newOrder.save();
//     res.status(201).json({ 
//       message: "Order Placed Successfully!",
//       orderId: order._id, 
//     });
//   } catch (error) {
//     res.status(500).json({ message: "Server Error", error: error.message });
//   }
// };

const placeOrder = async (req, res) => {
  try {
    const { items, totalPrice } = req.body;
    const newOrder = new Order({ user: req.user._id, items, totalPrice });
    await newOrder.save();
    res.status(201).json({ 
      message: "Order Placed Successfully!",
      orderId: newOrder._id, 
    });
  } catch (error) {
    console.error("❌ Order Placement Error:", error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};


const getOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id });
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// const getAllOrders = async (req, res) => {
//   try {
//     const orders = await Order.find().populate("user", "name email");
//     res.status(200).json(orders);
//   } catch (error) {
//     res.status(500).json({ message: "Server Error", error: error.message });
//   }
// };

// const updateOrderStatus = async (req, res) => {
//   try {
//     const order = await Order.findById(req.params.id);
//     if (!order) return res.status(404).json({ message: "Order not found" });

//     order.status = req.body.status || order.status;
//     await order.save();
//     res.status(200).json({ message: "Order status updated successfully" });
//   } catch (error) {
//     res.status(500).json({ message: "Server Error", error: error.message });
//   }
// };

// const getAllOrders = async (req, res) => {
//   try {
//     const orders = await Order.find();
//     res.json(orders);
//   } catch (error) {
//     res.status(500).json({ message: "Server Error", error });
//   }
// };

const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("user", "name email") // ✅ Add this line
      .sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};

const updateOrderStatus = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ message: "Order not found" });

    order.status = req.body.status;
    await order.save();
    res.json({ message: "Order Status Updated", order });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};

// get order by id
const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ message: "Order not found" });
    res.json(order);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};

// ✅ Vendor Order Fetch
const getVendorOrders = async (req, res) => {
  try {
    const vendorId = req.user._id;

    // Step 1: Vendor's all product IDs
    const vendorProducts = await Product.find({ createdBy: vendorId });
    const vendorProductIds = vendorProducts.map((p) => p._id.toString());

    // Step 2: Find orders that include these product IDs
    const orders = await Order.find({
      "items.productId": { $in: vendorProductIds },
    }).populate("user", "name email");

    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: "Server Error", error: err.message });
  }
};

module.exports = {
  placeOrder,
  getOrders,
  getAllOrders,
  updateOrderStatus,
  getOrderById,
  getVendorOrders,
};
