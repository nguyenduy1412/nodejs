const mongoose = require('mongoose');

const roleSchema = new mongoose.Schema({
    roleName: {
        type: String,
        required: true,
        unique: true,
        trim: true
    }
   
});

const Role = mongoose.model('Role', roleSchema);

module.exports = Role;
