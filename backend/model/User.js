const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        lowercase: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },
    items: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Item' }]
}, {timestamps: true})

module.exports = mongoose.model('User', userSchema)