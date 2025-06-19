// const express = require("express");
// const router = express.Router();
// const { registerUser, loginUser, updateUserProfile, getAllUsers, makeAdmin} = require("../controllers/userController");
// const protect = require("../middleware/authMiddleware");
// const adminOnly = require("../middleware/adminMiddleware");

// // Register Route: POST /api/users/register
// router.post("/register", registerUser);
// // Login Route: POST /api/users/login
// router.post("/login", loginUser);

// // Protected Route (Only Authenticated Users Can Access)
// router.get("/profile", protect, (req, res) => {
//   res.json({ message: "Welcome to your profile", user: req.user });
// });

// router.put("/update", protect, updateUserProfile);

// // router.get("/all", protect, adminOnly, getAllUsers);
// router.get("/all", protect, adminOnly, async (req, res) => {
//   try {
//     const users = await User.find();
//     res.json(users);
//   } catch (error) {
//     res.status(500).json({ message: "Server Error", error });
//   }
// });

// router.put("/make-admin/:id", protect, adminOnly, makeAdmin);

// module.exports = router;

const express = require("express");
const User = require("../models/User");
const upload = require("../middleware/uploadMiddleware");

const router = express.Router();
const {
  registerUser,
  loginUser,
  updateUserProfile,
  getAllUsers,
  makeAdmin,
} = require("../controllers/userController");
const protect = require("../middleware/authMiddleware");
const adminOnly = require("../middleware/adminMiddleware");

router.put("/update-role/:id", protect, adminOnly, async (req, res) => {
  const { role } = req.body;

  console.log("📥 Incoming role update:", role); // ✅ Add this
  console.log("🔎 Target user ID:", req.params.id);
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    user.role = role;
    await user.save();

    res.json({ message: "Role updated successfully" });
  } catch (error) {
     console.error("❌ Role update error:", error); // ✅ See actual cause
    res.status(500).json({ message: "Server Error", error });
  }
});

// ✅ Register & Login
router.post("/register", registerUser);
router.post("/login", loginUser);

// ✅ User Profile
router.get("/profile", protect, (req, res) => {
  res.json({ message: "Welcome to your profile", user: req.user });
});

// ✅ Update User
// router.put("/update", protect, updateUserProfile);

// ✅ Get All Users (For Admin)
router.get("/all", protect, adminOnly, getAllUsers);

// ✅ Make User Admin
router.put("/make-admin/:id", protect, adminOnly, makeAdmin);

// Profile update route
router.put("/update", protect, upload.single("profileImage"), updateUserProfile);

module.exports = router;
