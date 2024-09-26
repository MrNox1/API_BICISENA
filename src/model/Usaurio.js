const mongoose = require('mongoose');
const bcryptjs = require("bcryptjs")

const usuarioSchema = new mongoose.Schema({

    nombre: {
        type: String,
        required: true,
        maxlength: 50,
    },
    apellido: {
        type: String,
        required: true,
        maxlength: 50,
    },
    email: {
        type: String,
        required: false,
        maxlength: 50,
    },
    username: {
        type: String,
        required: false,
        maxlength: 50,

    },
    password: {
        type: String,
        required: false,
        maxlength: 250,
    },
    fk_rol: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Rol',
        required: false,
    },
});



usuarioSchema.methods.encrypPass = async password => {
    const salt = await bcryptjs.genSalt(10)
    return await bcryptjs.hash(password, salt)
}

usuarioSchema.methods.comparePass = async function (password) {
    return await bcryptjs.compare(password, this.password)
}



const Usuario = mongoose.model('Usuario', usuarioSchema);

module.exports = Usuario;
