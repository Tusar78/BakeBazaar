const jwt = require("jsonwebtoken");
const User = require("../models/User");
const bcrypt = require("bcryptjs");

const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash Password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create New User
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    if (user) {
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        message: "User Registered Successfully!",
      });
    } else {
      res.status(400).json({ message: "Invalid user data" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

// User Login Function
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Check Password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Generate JWT Token
    const token = user.generateAuthToken();

    res.status(200).json({
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        role: user.role,
      },
      message: "Login Successful",
    });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

// const updateUserProfile = async (req, res) => {
//   try {
//     const user = await User.findById(req.user.id);
//     if (!user) return res.status(404).json({ message: "User not found" });

//     user.name = req.body.name || user.name;
//     await user.save();

//     res.json({ message: "Profile Updated", user });
//   } catch (error) {
//     res.status(500).json({ message: "Server Error", error });
//   }
// };

// const updateUserProfile = async (req, res) => {
//   try {
//     const user = await User.findById(req.user._id);

//     if (user) {
//       user.name = req.body.name || user.name;
//       user.email = req.body.email || user.email;
//       user.profileImage = req.body.profileImage || user.profileImage;
//       user.location = req.body.location || user.location;
//       if (req.file) {
//         user.profileImage = `/uploads/profile/${req.file.filename}`;
//       }

//       const updatedUser = await user.save();
//       res.json({
//         _id: updatedUser._id,
//         name: updatedUser.name,
//         email: updatedUser.email,
//         profileImage: updatedUser.profileImage,
//         location: updatedUser.location,
//         isAdmin: updatedUser.isAdmin,
//       });
//     } else {
//       res.status(404).json({ message: "User not found." });
//     }
//   } catch (error) {
//     res.status(500).json({ message: "Update failed.", error });
//   }
// };

const updateUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (!user) return res.status(404).json({ message: "User not found." });

    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.location = req.body.location || user.location;

    // ✅ If image is uploaded, set path
    if (req.file) {
      // user.profileImage = `/uploads/profile/${req.file.filename}`;
      const baseUrl = `${req.protocol}://${req.get("host")}`;
      user.profileImage = `${baseUrl}/uploads/profile/${req.file.filename}`;
    }

    const updatedUser = await user.save();

    res.json({
      user: {
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        location: updatedUser.location,
        profileImage: updatedUser.profileImage,
        isAdmin: updatedUser.isAdmin,
        role: updatedUser.role,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Profile update failed", error });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};

const makeAdmin = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    user.isAdmin = true;
    await user.save();
    res.json({ message: "User is now Admin", user });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};

module.exports = {
  registerUser,
  loginUser,
  updateUserProfile,
  getAllUsers,
  makeAdmin,
};
