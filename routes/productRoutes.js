const express = require("express");
const router = express.Router();
const {
  getProducts,
  addProduct,
  deleteProduct,
  updateProduct,
  getSingleProduct,
  getVendorProducts,
} = require("../controllers/productController");
const protect = require("../middleware/authMiddleware");
const adminOnly = require("../middleware/adminMiddleware");
const Product = require("../models/Product");

router.get("/", getProducts);

router.get("/:id", getSingleProduct);

// router.post("/add", protect, addProduct); // ✅ Only Admin Can Add
router.post("/", protect, addProduct); // ✅ Only Admin Can Add
// Delete Product

// router.delete("/:id", protect, adminOnly, deleteProduct);
router.delete("/:id", protect, deleteProduct);

// router.delete("/:id", protect, adminOnly, deleteProduct); // ✅ Only Admin Can Delete
// router.put("/:id", protect, adminOnly, updateProduct);
router.put("/:id", protect, updateProduct);

// router.get("/vendor", protect,  async (req, res) => {
//   try {
//     const vendorId = req.user._id;
//     const products = await Product.find({ createdBy: vendorId });
//     res.json(products);
//   } catch (error) {
//     res.status(500).json({ message: "Server Error", error });
//   }
// });

router.get("/vendor", protect, getVendorProducts);


module.exports = router;
