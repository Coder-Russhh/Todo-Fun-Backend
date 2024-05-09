const express = require("express")
const userProfileController = require("../controllers/userProfileController")

const router = express.Router()

router.get("/userProfile", userProfileController.getUserProfile)
router.put("/userProfile", userProfileController.updateUserProfile)

module.exports = router;