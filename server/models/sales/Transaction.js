const mongoose = require('mongoose');

const TransactionSchema = new mongoose.Schema({
  description: { type: String, required: true },
  amount: { type: Number, required: true },
  date: { type: Date, required: true },
});

module.exports = mongoose.model('Transaction', TransactionSchema);