const express = require("express");
const categoryController = require("../controllers/categoryController");

const router = express.Router();

router.get('/categories', categoryController.getAllCategories);
router.post('/categories', categoryController.createCategory);

// Corrected DELETE route with :id parameter
router.delete('/categories/:id', categoryController.deleteCategory);

module.exports = router;
