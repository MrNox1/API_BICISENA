const mongoose = require("mongoose");

const stationSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
    maxlength: 50,
  },
  direccion: {
    type: String,
    required: false,
    maxlength: 50,
  },
  coordenadas: {
    type: [String],
    required: false,
  },
  estado: {
    type: Boolean,
    required: true,
    default: true,
  },
});

const Station = mongoose.model("Station", stationSchema);

module.exports = Station;
