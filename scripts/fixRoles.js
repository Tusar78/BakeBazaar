const User = require("../models/User");

const fixMissingRoles = async () => {
  try {
    const users = await User.find({
      role: { $exists: false } // যাদের role নেই শুধু তাদের খুঁজে বের করো
    });

    for (let user of users) {
      user.role = "user";
      await user.save();
      console.log(`✅ Updated role for: ${user.email}`);
    }

    console.log("🎉 Role fix completed!");
  } catch (error) {
    console.error("❌ Error fixing roles:", error);
  }
};

module.exports = fixMissingRoles;
