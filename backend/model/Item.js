const mongoose = require("mongoose")

const itemSchema = new mongoose.Schema({
    type: {
        type: String,
        required: true,
        default: "N/A"
    },
    label: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
        default: 10,
    },
    currency: {
        type: String,
        required: true,
        default: "CZK"
    },
    unit: {
        type: String,
        required: false,
        default: "ks"
    },
    notes: {
        type: String,
        required: false
    },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true })

module.exports = mongoose.model('Item', itemSchema)