const Product = require("../models/Product");

// ✅ Get All Products
const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};

// ✅ Add a New Product (Admin Only)
const addProduct = async (req, res) => {
  try {
    const { name, description, price, image, category, inStock } = req.body;

    const newProduct = new Product({
      name,
      description,
      price,
      image,
      category, // ✅ optional, if you use category-based filtering
      inStock, // ✅ optional, if you want to specify stock status
      createdBy: req.user._id, // ✅ Associate product with the user who created it
    });

    await newProduct.save();
    res.status(201).json({ message: "Product Added Successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};

// ✅ DELETE PRODUCT
const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    // 🛡️ Check: Does product exist?
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // 🛡️ Check: Is user owner of product OR admin?
    const isOwner = product.createdBy?.toString() === req.user._id.toString();
    const isAdmin = req.user.isAdmin;

    if (!isOwner && !isAdmin) {
      return res.status(403).json({ message: "Not authorized to delete" });
    }

    await product.deleteOne();
    res.json({ message: "Product deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server Error", error: err.message });
  }
};

// const updateProduct = async (req, res) => {
//   try {
//     const product = await Product.findById(req.params.id);
//     if (!product) return res.status(404).json({ message: "Product not found" });

//     const isOwner = product.createdBy?.toString() === req.user._id.toString();
//     const isAdmin = req.user.isAdmin;

//     if (!isOwner && !isAdmin) {
//       return res.status(403).json({ message: "Not authorized to update" });
//     }

//     const { name, price, category, description, image } = req.body;

//     if (name) product.name = name;
//     if (price) product.price = price;
//     if (category) product.category = category;
//     if (description) product.description = description;
//     if (image) product.image = image;

//     await product.save();

//     res.json({ message: "Product updated successfully!" });
//   } catch (error) {
//     res.status(500).json({ message: "Server Error", error: error.message });
//   }
// };

const updateProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });

    const isOwner = product.createdBy?.toString() === req.user._id.toString();
    const isAdmin = req.user.isAdmin;

    if (!isOwner && !isAdmin) {
      return res.status(403).json({ message: "Not authorized to update" });
    }

    const updateFields = {};
    const allowedFields = ["name", "price", "category", "description", "image"];

    allowedFields.forEach(field => {
      if (req.body[field] !== undefined) {
        updateFields[field] = field === "price" ? Number(req.body[field]) : req.body[field];
      }
    });

    // category অবশ্যই updateFields এ থাকতে হবে বা আগের মতো থাকবে
    if (!updateFields.category && !product.category) {
      return res.status(400).json({ message: "Category is required" });
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      { $set: updateFields },
      { new: true, runValidators: true }
    );

    res.json({ message: "Product updated successfully!", product: updatedProduct });
  } catch (error) {
    console.error("Update Product Error:", error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};


// ✅ Get Single Product
const getSingleProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// ✅ Export All
module.exports = {
  getProducts,
  addProduct,
  deleteProduct, // ✅ now available in routes
  updateProduct, // ✅ now available in routes
  getSingleProduct, // ✅ now available in routes
};
