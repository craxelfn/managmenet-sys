const mongoose = require('mongoose');

const reportSchema = new mongoose.Schema({
  reported_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  username: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  department: {
    type: String,
    required: true
  },
  zone: {
    type: String,
    required: true
  },
  bureau: {
    type: String,
    required: true
  },
  problemType: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  attachments: [{
    type: String  // This will store file paths or URLs
  }]
}, { timestamps: true });

const Report = mongoose.model('Report', reportSchema);

module.exports = Report;