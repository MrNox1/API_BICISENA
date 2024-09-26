const mongoose = require("mongoose");

const registroSchema = new mongoose.Schema({
  nombreRegistro: {
    type: String,
    required: true,
    maxlength: 250,
  },
  fk_bici: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Bicycle",
  },
  fk_estacionInicial: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Station",
  },
  fk_estacionFinal: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Station",
  },
  fecha: {
    type: Date,
    required: true,
  },
  estado: {
    type: Boolean,
    required: true,
    default: true,
  },
  distancia: {
    type: String,
    required: true,
    maxlength: 250,
  },
  fk_descuento: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Discount",
  },
  fk_usuario: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Usuario",
  },
  precioTotal: {
    type: Number,
    required: true,
  },
});

// fk_rol: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "Rol",
//     required: false,
//   },

const rentRegistration = mongoose.model("rentRegistration", registroSchema);

module.exports = rentRegistration;
