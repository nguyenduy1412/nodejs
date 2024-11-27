const mongoose = require('mongoose');

const addressSchema = new mongoose.Schema({
  addressShip: {
    type: String,
  },
  phone:{
    type: String,
  },
  name:{
    type:String,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  } 
}, { timestamps: true });

const Address = mongoose.model('Address', addressSchema);

module.exports = Address;