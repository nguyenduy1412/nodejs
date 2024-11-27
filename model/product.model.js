const mongoose = require('mongoose');


const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: false,
        maxlength: 255, // Mô phỏng @Column(columnDefinition = "nvarchar(255)")
    },
    priceEnter: {
        type: Number,
        required: false,
    },
    price: {
        type: Number,
        required: false,
    },
    priceSale: {
        type: Number,
        required: false,
    },
    image: {
        type: String,
        required: false,
    },
    profit: {
        type: Number,
        required: false,
    },
    publicationYear: {
        type: Number,
        required: false,
    },
    sale: {
        type: Number,
        required: false,
    },
    description: {
        type: String,
        maxlength: 4000, // Mô phỏng @Column(columnDefinition = "nvarchar(4000)")
    },
    status: {
        type: Boolean,
        default: true, // Mặc định là true nếu không có giá trị
    },
    star: {
        type: Number,
        default: 0, // Mặc định là true nếu không có giá trị
    },
    dateAdded: {
        type: Date,
        default: Date.now, // Giá trị mặc định là thời điểm hiện tại
    },
    // Liên kết với Category (sử dụng ObjectId để tham chiếu)
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category', // Tham chiếu đến model 'Category'
    },
    brand: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Brand', 
    },
}, { timestamps: true });

// Tạo model từ schema
const Product = mongoose.model('Product', productSchema);

module.exports = Product;
