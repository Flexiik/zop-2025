const express = require("express")
const router = express.Router()
const verifyToken = require("../middleware/authMiddleware")
const { getNews, createNews } = require("../services/newsService")

router.get("/", getNews)
router.post("/", verifyToken, createNews)

module.exports = router 