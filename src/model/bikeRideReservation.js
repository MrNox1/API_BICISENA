const mongoose = require("mongoose");

const bikeRideReservation = new mongoose.Schema({
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

const Payment = mongoose.model("Payment", paymentSchema);

module.exports = Payment;
