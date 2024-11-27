const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
   
    password: {
        type: String,
        minlength: [6, "Mật khẩu phải có ít nhất 6 ký tự"],
        required: true,
    },
    enabled: {
        type: Boolean,
        default: true,
    },
    codeOtp: {
        type: String,
    },
    fullName: {
        type: String,
        trim: true,
    },
    gender: {
        type: Boolean,
        default:true
    },
    address: {
        type: String,
        trim: true,
    },
    email: {
        type: String,
        match: [/^\S+@\S+\.\S+$/, "Định dạng email không đúng"],
        required: [true, "Email không được để trống"],
        unique: true,
    },
    telephone: {
        type: String,
        match: [/^[\+]?[0-9]{10,14}$/, "Số điện thoại không đúng định dạng"],
    },
    birthday: {
        type: Date,
    },
    img: {
        type: String,
    }
    
});

const User = mongoose.model('User', userSchema);

module.exports = User;
