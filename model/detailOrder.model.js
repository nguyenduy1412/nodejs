const mongoose = require('mongoose');

const detailOrderSchema = new mongoose.Schema({
  quantity: {
    type: Number,
    default: 1
  },
  price: {
    type: Number,
    default: 0
  },
  order: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Order',
  },
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product', 
  },
  statusReview:{
    type:Boolean,
    default: false
  }
}, { timestamps: true });

const DetailOrder = mongoose.model('DetailOrder', detailOrderSchema);

module.exports = DetailOrder;