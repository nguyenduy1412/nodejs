const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  status: {
    type: Boolean,
    default: true,
  },
  img:{
    type: String,
  }
}, { timestamps: true });

const Category = mongoose.model('Category', categorySchema);

module.exports = Category;