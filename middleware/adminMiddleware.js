const User = require("../models/User");

const adminOnly = (req, res, next) => {
  if (req.user.email !== "admin@gmail.com") {
    return res.status(403).json({ message: "Access Denied. Admins Only!" });
  }
  next();
};

module.exports = adminOnly;
