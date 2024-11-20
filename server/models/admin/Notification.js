const mongoose = require('mongoose');

const NotificationSchema = new mongoose.Schema({
  type: { type: String, required: true },
  message: { type: String, required: true },
  date: { type: Date, default: Date.now },
  status: { type: String, enum: ['Pending', 'Resolved'], default: 'Pending' },
});

module.exports = mongoose.model('Notification', NotificationSchema);