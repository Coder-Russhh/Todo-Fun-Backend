const Todo = require("../models/Todo");

// now we creating all controller functions

// get all--
const getALLTodos = async (req, res) => {
  try {
    const todos = await Todo.find();
    res.json(todos);
  } catch (error) {
    console.error("Error fetching todos and error: error");
    res.status(500).json({
      error: "Internal Server Error",
    });
  }
};

// create todo list--
const createTodo = async (req, res) => {
  const { title } = req.body;
  try {
    const existingTodo = await Todo.findOne({ title });

    if (existingTodo) {
      // If a todo with the same title exists, provide a notification
      return res
        .status(409)
        .json({
          message:
            "A todo with the same title already exists. Do you want to proceed?",
        });
    }
    const newTodo = new Todo({
      title,
    });
    const savedTodo = await newTodo.save();
    res.json(savedTodo);
  } catch (error) {
    console.error("Error creating TODO:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// update todo list--
const updateTodo = async (req, res) => {
  const { id } = req.params;
  const { title, completed } = req.body;

  try {
    const updatedTodo = await Todo.findByIdAndUpdate(
      id,
      { title, completed },
      { new: true }
    );

    if (!updatedTodo) {
      return res.status(404).json({ error: "Todo not found" });
    }

    res.json(updatedTodo);
  } catch (error) {
    console.error("Error updating TODO:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// delete any specific list--
const deleteTodo = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedTodo = await Todo.findByIdAndDelete(id);

    if (!deletedTodo) {
      return res.status(404).json({ error: "Todo not found" });
    }

    res.json({ message: "Todo deleted successfully" });
  } catch (error) {
    console.error("Error deleting TODO:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  getALLTodos,
  createTodo,
  updateTodo,
  deleteTodo,
};