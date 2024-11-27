const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
  price: {
    type: Number,
    default: 0
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', 
  },
  total:{
    type: Number,
    default: 0
  }
}, { timestamps: true });

const Cart = mongoose.model('Cart', cartSchema);

module.exports = Cart;