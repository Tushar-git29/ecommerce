const mongoose = require("mongoose");

const todo = new mongoose.Schema({
  taskName: {
    type: String,
    required: true,
  },
  taskDate: {
    type: Date,
    required: true,
  },
  taskTime: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("todolist", todo);
