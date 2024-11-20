const mongoose = require('mongoose');

const ResourceSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String, required: true },
  quantity: { type: Number, required: true },
  location: { type: String, required: true },
  lastRestockDate: { type: Date, default: Date.now },
  minimumQuantity: { type: Number, required: true },
});

module.exports = mongoose.model('Resource', ResourceSchema);
