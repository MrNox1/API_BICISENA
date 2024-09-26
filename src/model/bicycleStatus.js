const mongoose = require('mongoose');

const bicycleStatusSchema = new mongoose.Schema({

    type: {
        type: String,
        required: true,
        maxlength: 50,
    },
});

const BicycleStatus = mongoose.model('BicycleStatus', bicycleStatusSchema);

module.exports = BicycleStatus;
