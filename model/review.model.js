const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    detailOrder:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'DetailOrder',
        required: true
    },
    date:{
        type:Date,
        default: () => new Date()
    },
    status:{
        type: Boolean,
        default: true,
    },
    star:{
        type: Number,
        default: 1
    },
    img:{
        type: String,

    },
    comment:{
        type: String,
    }
});

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;
