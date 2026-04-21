const mongoose = require('mongoose');

const memberSchema = new mongoose.Schema({
  name:       { type: String, required: true, trim: true },
  role:       { type: String, required: true, trim: true },
  email:      { type: String, required: true, trim: true },
  phone:      { type: String, default: '' },
  department: { type: String, default: '' },
  bio:        { type: String, default: '' },
  image:      { type: String, default: '' },   // filename stored in uploads/
  createdAt:  { type: Date, default: Date.now }
});

module.exports = mongoose.model('Member', memberSchema);
