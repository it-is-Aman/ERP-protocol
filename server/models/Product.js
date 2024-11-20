const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    name: { type: String, required: true },
    sku: { type: String, required: true, unique: true },
    quantity: { type: Number, required: true },
    price: { type: Number, required: true },
    restockLevel: { type: Number, default: 10 },
});

module.exports = mongoose.model('Product', ProductSchema);