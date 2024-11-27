const mongoose = require('mongoose');

const discountCodeSchema = new mongoose.Schema({
  expiry: {
    type: Date,
  },
  nameCode:{
    type: String,
  },
  quantity:{
    type:Number,
  },
  total:{
    type:Number,
  },
  money:{
    type:Number,
  },
  status:{
    type:Boolean,
    default:true
  }
}, { timestamps: true });

const DiscountCode = mongoose.model('DiscountCode', discountCodeSchema);

module.exports = DiscountCode;