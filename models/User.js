// const mongoose = require("mongoose");
// const jwt = require("jsonwebtoken");

// const userSchema = new mongoose.Schema(
//   {
//     name: { type: String, required: true },
//     email: { type: String, required: true, unique: true },
//     password: { type: String, required: true },
//   },
//   { timestamps: true }
// );

// // Generate JWT Token Method
// userSchema.methods.generateAuthToken = function () {
//   return jwt.sign({ _id: this._id, email: this.email }, process.env.JWT_SECRET, {
//     expiresIn: "7d",
//   });
// };

// const User = mongoose.model("User", userSchema);
// module.exports = User;

const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: ["user", "vendor", "moderator", "admin"],
      default: "user",
    },

    profileImage: { type: String, default: "" }, // ✅ New Field
    location: { type: String, default: "" }, // ✅ New Field
    isAdmin: { type: Boolean, default: false }, // <== Add this line
  },
  { timestamps: true }
);

// Generate JWT Token Method
userSchema.methods.generateAuthToken = function () {
  return jwt.sign(
    {
      _id: this._id,
      email: this.email,
      isAdmin: this.isAdmin,
      role: this.role,
    }, // Include isAdmin in token payload
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );
};

const User = mongoose.model("User", userSchema);
module.exports = User;
