const express = require("express");
const router = express.Router();
const todoTasks = require("../models/todo.js");

router.post("/todo-data", async (req, res) => {
  try {
    const createData = await todoTasks.create(req.body);
    const savedTask = await createData.save();
    res.status(201).json(savedTask);

    // res.status(201).json({ message: "task is added", data: createData });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/todo-data", async (req, res) => {
  try {
    const all_data = await todoTasks.find();
    res.status(200).json(all_data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Define route with :id parameter
router.delete("/todo-data/:id", async (req, res) => {
  try {
    const deleteTask = await todoTasks.findByIdAndDelete(req.params.id);

    if (!deleteTask) {
      return res.status(404).json({ message: "Task not found" });
    }

    res
      .status(200)
      .json({ message: "Task deleted successfully", deletedTask: deleteTask });
  } catch (error) {
    res.status(500).json({ message: "Error deleting task", error });
  }
});

module.exports = router;
