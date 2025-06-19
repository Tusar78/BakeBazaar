const jwt = require("jsonwebtoken");
const User = require("../models/User");

const protect = async (req, res, next) => {
  let token;

  // Check if Authorization Header has Bearer Token
  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    try {
      token = req.headers.authorization.split(" ")[1]; // Get Token from Header
      const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify Token

      req.user = await User.findById(decoded._id).select("-password"); // Get User Data (excluding password)
      next();
    } catch (error) {
      res.status(401).json({ message: "Unauthorized, Invalid Token" });
    }
  } else {
    res.status(401).json({ message: "No Token Provided" });
  }
};

module.exports = protect;
