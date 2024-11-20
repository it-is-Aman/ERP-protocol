const mongoose = require('mongoose');

const AttendanceSchema = new mongoose.Schema({
  employee: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee', required: true },
  date: { type: Date, required: true },
  status: { type: String, enum: ['Present', 'Absent', 'Half Day'], required: true },
  checkIn: { type: Date },
  checkOut: { type: Date },
  overtime: { type: Number, default: 0 }
});

module.exports = mongoose.model('Attendance', AttendanceSchema);
