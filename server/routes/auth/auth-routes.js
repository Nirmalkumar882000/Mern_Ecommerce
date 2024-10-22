const express = require("express")
const router = express.Router()
const {
    registerUser,
    loginUser,
    logOutUser,
    authMiddleWare
} = require("../../controllers/auth/auth-controller")

router.post("/register", registerUser)
router.post("/login", loginUser)
router.post("/logout", logOutUser)
router.get("/check_auth", authMiddleWare, (req, res) => {
    const user = req.user
    if (user) {
        return res.status(400).json({
            success: false,
            message: "All flied required"
        })
    }

    res.status(200).json({
        success: true,
        message: "Authenticated user!",
        user,
    });
})

module.exports = router