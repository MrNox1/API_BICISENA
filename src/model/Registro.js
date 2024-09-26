const mongoose = require('mongoose');

// Definir el esquema para Registro
const registroSchema = new mongoose.Schema({
    idRegistro: {
        type: Number,
        required: true,
        unique: true, // Aseguramos que no haya duplicados
    },
    nombreRegistro: {
        type: String,
        required: true,
        maxlength: 250, // Limitar a 250 caracteres
    },
    fk_bici: {
        type: Number,
        required: true,
    },
    fk_estacionInicial: {
        type: Number,
        required: true,
    },
    fk_estacionFinal: {
        type: Number,
        required: true,
    },
    fecha: {
        type: Date,
        required: true,
    },
    estado: {
        type: Boolean, // Usamos Boolean para el tipo bit
        required: true,
    },
    distancia: {
        type: String,
        required: true,
        maxlength: 250, // Limitar a 250 caracteres
    },
    fk_descuento: {
        type: Number,
        required: true,
    },
    fk_usuario: {
        type: Number,
        required: true,
    },
    precioTotal: {
        type: Number,
        required: true,
    },
});

// Crear el modelo
const Registro = mongoose.model('Registro', registroSchema);

module.exports = Registro;