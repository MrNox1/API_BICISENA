const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema({
  idCiclopase: {
    type: String,
    required: true,
    maxlength: 10,
  },
  idUsuario: {
    type: String,
    required: true,
    maxlength: 10,
  },
  tipoPago: {
    type: String,
    required: true,
    maxlength: 10,
  },
  total: {
    type: String,
    required: true,
    maxlength: 10,
  },
});

const bikeRideReservation = mongoose.model(
  "bikeRideReservation",
  paymentSchema
);

module.exports = bikeRideReservation;
