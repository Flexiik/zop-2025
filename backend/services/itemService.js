const mongoose = require("mongoose")
const Item = require("../model/Item")

const getAllItems = async (req, res) => {
    // ONLY FOR AUTHENTICATED (GET YOUR ITEMS)
    try {
        const items = await Item.find({ user: req.user._id })

        res.status(200).json(items)
    } catch (e) {
        res.status(500).json({ message: e.message || "Bad request" })
    }
}

const getItemById = async (req, res) => {
    // ONLY FOR AUTHENTICATED

    const { id } = req.params;

    if(!mongoose.isValidObjectId(id)) return res.status(400).json({ message: "Provide a valid id" })

    try {
        const item = await Item.findById(id)

        if(!item) return res.status(400).json({ message: "Item not found." })
        if(!item.user !== req.user._id) return res.status(403).json({ message: "You don't have access to this." })

        res.status(200).json(item)
    } catch (e) {
        res.status(400).json({ message: e.message || "Bad request" })
    }
}

const createItem = async (req, res) => {
    // ONLY FOR AUTHENTICATED USERS
    try {
        // Create a new item with data from the request body and associate it with the authenticated user
        const newItem = new Item({
            ...req.body,
            user: req.user._id
        });

        // Save the new item to the database
        await newItem.save();

        // Respond with the created item
        res.status(201).json(newItem);
    } catch (e) {
        res.status(400).json({ message: e.message || "Bad request" });
    }
};

const updateItem = async (req, res) => {
    // ONLY FOR AUTHENTICATED USERS

    const { id } = req.params;

    // Validate the provided item ID
    if (!mongoose.isValidObjectId(id)) {
        return res.status(400).json({ message: "Provide a valid id" });
    }

    try {
        // Find the item by ID
        const item = await Item.findById(id);

        // Check if the item exists
        if (!item) {
            return res.status(404).json({ message: "Item not found." });
        }

        // Verify that the item belongs to the authenticated user
        if (!item.user.equals(req.user._id)) {
            return res.status(403).json({ message: "You don't have access to this." });
        }

        // Update the item with new data from the request body
        Object.assign(item, req.body);

        // Save the updated item to the database
        await item.save();

        // Respond with the updated item
        res.status(200).json(item);
    } catch (e) {
        res.status(400).json({ message: e.message || "Bad request" });
    }
};

const deleteItem = async (req, res) => {
    // ONLY FOR AUTHENTICATED USERS

    const { id } = req.params;

    // Validate the provided item ID
    if (!mongoose.isValidObjectId(id)) {
        return res.status(400).json({ message: "Provide a valid id" });
    }

    try {
        // Find the item by ID
        const item = await Item.findById(id);

        // Check if the item exists
        if (!item) {
            return res.status(404).json({ message: "Item not found." });
        }

        // Verify that the item belongs to the authenticated user
        if (!item.user.equals(req.user._id)) {
            return res.status(403).json({ message: "You don't have access to this." });
        }

        // Delete the item from the database
        await item.deleteOne();

        // Respond with a success message
        res.status(200).json({ message: "Item successfully deleted." });
    } catch (e) {
        res.status(400).json({ message: e.message || "Bad request" });
    }
};


module.exports = { getAllItems, getItemById, createItem, updateItem, deleteItem }