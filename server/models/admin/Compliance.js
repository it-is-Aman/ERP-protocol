const mongoose = require('mongoose');

const ComplianceSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String, required: true },
  expirationDate: { type: Date, required: true },
  status: { type: String, enum: ['Active', 'Expired', 'Pending Renewal'], default: 'Active' },
  responsiblePerson: { type: String, required: true },
  description: { type: String },
  policyLink: { type: String },
});

module.exports = mongoose.model('Compliance', ComplianceSchema);
