const mongoose = require('mongoose');

const bannerSchema = new mongoose.Schema({
  link: {
    type: String,
   
  },
  img:{
    type: String,
  },
  position:{
    type:Number,
  },
  status:{
    type:Boolean,
    default:true
  }
}, { timestamps: true });

const Banner = mongoose.model('Banner', bannerSchema);

module.exports = Banner;