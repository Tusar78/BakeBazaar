const mongoose = require("mongoose");

// Function to connect to MongoDB
const connectDB = async () => {
  try {
    // MongoDB connection using the URI from .env
    const conn = await mongoose.connect(process.env.MONGO_URI);
    
    // Log the MongoDB host to confirm the connection
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    // Log any error that occurs during the connection
    console.error(`Error: ${error.message}`);
    process.exit(1);  // Exit the process if there is a connection error
  }
};

// Export the connectDB function
module.exports = connectDB;
