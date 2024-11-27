const mongoose = require('mongoose');

const detailCartSchema = new mongoose.Schema({
  quantity: {
    type: Number,
    default: 1
  },
  cart: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Cart',
  },
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product', 
  },
}, { timestamps: true });

const DetailCart = mongoose.model('DetailCart', detailCartSchema);

module.exports = DetailCart;