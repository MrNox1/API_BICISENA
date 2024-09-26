const mongoose = require('mongoose');

const bicycleSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        maxlength: 50,
    },
    fk_brand: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Brand',
        required: true,
    },
    fk_bicycleStatus: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'BicycleStatus',
        required: true,
    },
    color: {
        type: String,
        required: false,
        maxlength: 50,
    },
    description: {
        type: String,
        required: false,
    },
    image: {
        type: String,
        required: false,
    },
});

const Bicycle = mongoose.model('Bicycle', bicycleSchema);

module.exports = Bicycle;
