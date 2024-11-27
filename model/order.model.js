const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  sumMoney: {
    type: Number,
    default: 0
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  status:{
    type: Number,
    default: 0
  },
  date:{
    type:Date,
    default: () => new Date()
  },
  note:{
    type: String,
  },
  discountCode:{
    type: String,
  },
  pay:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'MethodPay',
  },
  addressShip:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Address',
  }
}, { timestamps: true });

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;