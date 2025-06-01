const mongoose = require('mongoose');

const dailyStatusSchema = new mongoose.Schema({
  patient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  doctor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  date: { type: Date, default: Date.now },
  symptoms: { type: String },
  temperature: { type: Number },
  aiSummary: { type: String },
  criticalityScore: { type: Number, default: 0 },
  doctorResponse: { type: String },
  alertSent: { type: Boolean, default: false },
  read: { type: Boolean, default: false },
});

module.exports = mongoose.model('DailyStatus', dailyStatusSchema);
