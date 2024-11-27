const mongoose = require('mongoose');

const methodPaySchema = new mongoose.Schema({
  name: {
    type: String,
  }
  
}, { timestamps: true });

const MethodPay = mongoose.model('MethodPay', methodPaySchema);

module.exports = MethodPay;