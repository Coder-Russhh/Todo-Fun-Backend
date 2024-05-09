const express = require("express");
const todoController = require("../controllers/todoControllers")

const router = express.Router()

// Get all todos--
router.get('/todos', todoController.getALLTodos);

// Create a todo--
router.post('/todos', todoController.createTodo);

// Update a todo--
router.put('/todos/:id', todoController.updateTodo);

// Delete a todo
router.delete('/todos/:id', todoController.deleteTodo);

module.exports = router;