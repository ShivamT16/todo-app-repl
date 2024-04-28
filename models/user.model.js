const mongoose = require("mongoose");

const todoUserSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  confirmPassword: { type: String, required: true },
});

const TodoUser = mongoose.model("User", todoUserSchema);

module.exports = TodoUser;
