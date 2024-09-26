const mongoose = require("mongoose");

const cycleRideSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
    maxlength: 100,
  },
  estacionInit: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "station",
    maxlength: 50,
  },
  endingStation: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "station",
    maxlength: 50,
  },
  price: {
    type: String,
    required: true,
    maxlength: 10,
  },
  description: {
    type: String,
    required: false,
    maxlength: 250,
  },
});

const CycleRidesRegistration = mongoose.model(
  "CycleRidesRegistration",
  cycleRideSchema
);

module.exports = CycleRidesRegistration;
