const express = require("express")
const { login, register } = require("../services/authService")
const router = express.Router()
const verifyToken = require("../middleware/authMiddleware")

router.post("/login", login)
router.post("/register", register)
router.get("/user", verifyToken, (req, res) => res.status(200).json(req.user))

module.exports = router