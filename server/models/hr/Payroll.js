const mongoose = require('mongoose');

const PayrollSchema = new mongoose.Schema({
  employee: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee', required: true },
  month: { type: Number, required: true },
  year: { type: Number, required: true },
  basicSalary: { type: Number, required: true },
  overtime: { type: Number, default: 0 },
  deductions: {
    tax: { type: Number, default: 0 },
    leave: { type: Number, default: 0 }
  },
  netSalary: { type: Number, required: true }
});

module.exports = mongoose.model('Payroll', PayrollSchema);