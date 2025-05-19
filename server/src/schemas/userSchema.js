const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }, // hashed
  role: { type: String, enum: ['patient', 'doctor'], required: true },
  phone: { type: String },

  // Doctor-specific fields
  specialization: { type: String },

  // Patient-specific fields
  surgeryDetails: { type: String },
  recoveryTimeDays: { type: Number },
  assignedDoctor: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // if role = patient
  startDate: { type: Date },

});

module.exports = mongoose.model('User', userSchema);
