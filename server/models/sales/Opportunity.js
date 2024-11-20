const mongoose = require('mongoose');

const OpportunitySchema = new mongoose.Schema({
  name: { type: String, required: true },
  value: { type: Number, required: true },
  stage: { type: String, enum: ['Prospecting', 'Qualification', 'Proposal', 'Negotiation', 'Closed Won', 'Closed Lost'], default: 'Prospecting' },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Opportunity', OpportunitySchema);