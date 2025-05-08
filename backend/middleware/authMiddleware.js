const jwt = require("jsonwebtoken")
const User = require("../model/User")
const verifyToken = async (req, res, next) => {
    const header = req.headers['authorization']
    const token = header ? header.split(' ')[1] : null;

    if(!token) return res.status(401).json({ message: "Access denied" })

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.user = await User.findById(decoded._id)
        next()
    } catch (e) {
        res.status(400).json({ message: "Invalid token" })
    }
}

module.exports = verifyToken