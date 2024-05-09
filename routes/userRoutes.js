const express = require("express")
const userController = require("../controllers/userController")

const router = express.Router()

router.post("/register",userController.registerUser)
router.post("/login",userController.loginUser)
router.put("/update",userController.updateUser)
router.post("/delete",userController.logoutUser)

module.exports = router;

