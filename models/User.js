const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  email: { type: String },
  password: { type: String },
  DOB: { type: Date },
  userType: { type: String }, // passenger, driver, admin
  phone: { type: String }, //
  registerDate: { type: Date, default: Date.now() },
  avatar: { type: String }
});

const User = mongoose.model("User", UserSchema, "User");

module.exports = {
  UserSchema,
  User
};
