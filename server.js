const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");  // MongoDB connection module import
const userRoutes = require("./routes/userRoutes");
const orderRoutes = require("./routes/orderRoutes");
const paymentRoutes = require("./routes/paymentRoutes");
const productRoutes = require("./routes/productRoutes");




// Initialize Express app
dotenv.config();  // Load environment variables
const app = express();

// Middleware setup
app.use(cors());  // Enable Cross-Origin Resource Sharing
app.use(express.json());  // Parse incoming JSON requests



app.use("/api/users", userRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/payment", paymentRoutes);
app.use("/api/products", productRoutes);




// Test route for server
app.get("/", (req, res) => {
  res.send("BakeBazaar Backend is Running!");
});



const path = require("path");

// Serve static profile images
app.use("/uploads/profile", express.static(path.join(__dirname, "uploads/profile")));

// Connect to MongoDB
connectDB();  // MongoDB connection function call

// Start the server on the specified port
const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
app.listen(PORT, "0.0.0.0", () =>
  console.log(`Server running on http://0.0.0.0:${PORT}`)
);





