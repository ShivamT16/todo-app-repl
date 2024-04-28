const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema({
  title: String,
  description: String,
  status: String,
});

const Todo = mongoose.model("Todo", todoSchema);

module.exports = Todo;
