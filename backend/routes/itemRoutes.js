const express = require("express")
const router = express.Router()
const verifyToken = require("../middleware/authMiddleware")
const { getAllItems, getItemById, createItem, updateItem, deleteItem } = require("../services/itemService")

router.get("/", verifyToken, getAllItems)
router.get("/:id", verifyToken, getItemById)
router.post("/", verifyToken, createItem)
router.patch("/:id", verifyToken, updateItem)
router.delete("/:id", verifyToken, deleteItem)

module.exports = router