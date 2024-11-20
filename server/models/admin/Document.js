const mongoose = require('mongoose');

const DocumentSchema = new mongoose.Schema({
  title: { type: String, required: true },
  type: { type: String, required: true },
  filename: { type: String, required: true },
  content: { type: String, required: true },
  uploadDate: { type: Date, default: Date.now },
  lastModified: { type: Date, default: Date.now },
  uploadedBy: { type: String, required: true },
  accessibleTo: [{ type: String }], // Array of department names
});

module.exports = mongoose.model('Document', DocumentSchema);
