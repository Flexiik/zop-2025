const mongoose = require("mongoose")

const newsSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    needsAuth: {
        type: Boolean,
        required: true,
        default: false
    }
}, {timestamps: true})

module.exports = mongoose.model('News', newsSchema) 