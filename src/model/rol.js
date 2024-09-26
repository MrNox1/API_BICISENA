const mongoose = require('mongoose');


const rolSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true,
        maxlength: 100,
    },
});


const Rol = mongoose.model('Rol', rolSchema);

module.exports = Rol;

// timestamps:true;