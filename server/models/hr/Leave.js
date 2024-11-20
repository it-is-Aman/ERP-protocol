const mongoose = require('mongoose');

const LeaveSchema = new mongoose.Schema({
  employee: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee', required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  type: { type: String, enum: ['Sick', 'Vacation', 'Personal'], required: true },
  status: { type: String, enum: ['Pending', 'Approved', 'Rejected'], default: 'Pending' },
  reason: { type: String, required: true }
});

module.exports = mongoose.model('Leave', LeaveSchema);
