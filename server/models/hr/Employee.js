const mongoose = require('mongoose');

const EmployeeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  position: { type: String, required: true },
  department: { type: String, required: true },
  joinDate: { type: Date, default: Date.now },
  salary: { type: Number, required: true }
});

module.exports = mongoose.model('Employee', EmployeeSchema);
