const mongoose = require('mongoose');

const brandSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        maxlength: 50,
    },
});

const Brand = mongoose.model('Brand', brandSchema);

module.exports = Brand;