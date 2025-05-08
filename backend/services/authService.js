const User = require('../model/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const register = async (req, res) => {
    const { username, password } = req.body;

    if(!username || !password) return res.status(400).json({ message: "Please enter all the fields"})

    try {
        
        const hashedPassword = await bcrypt.hash(password, 10)

        const user = new User({ username, password: hashedPassword, items: []})
        await user.save()

        const token = jwt.sign({_id: user._id}, process.env.JWT_SECRET, {
            expiresIn: 6400 // 2 hodiny
        })

        res.status(201).json(token)

    } catch (e) {
        res.status(400).json({ message: "Registration failed" })
    }
}

const login = async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) return res.status(400).json({ message: "Please enter all the fields" })

    try {
        const user = await User.findOne({ username })
        if(!user) return res.status(400).json({ message: "User not found" })

        const isMatch = await bcrypt.compare(password, user.password)
        if(!isMatch) return res.status(400).json({ message: "Invalid credentials"})

        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
            expiresIn: 6400 // 2 hodiny
        })

        res.status(200).json(token)
    } catch (e) {
        res.status(400).json({ message: "Login failed" })
    }
}

module.exports = { register, login }