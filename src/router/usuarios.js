
const express = require('express');
const Usuario = require("../model/Usaurio");
const jwt = require('jsonwebtoken');

const routerUser = express.Router();


const JWT_SECRET = 'tu_clave_secreta';

routerUser.post('/', async (req, res) => {
    try {


        const existingUser = await Usuario.findOne({ username: req.body.username });
        if (existingUser) {
            return res.status(400).json({ mensaje: "El nombre de usuario ya existe" });
        }


        console.log(req.body)
        const newUser = new Usuario({

            nombre: req.body.nombre,
            apellido: req.body.apellido,
            email: req.body.email,
            username: req.body.username,
            password: await new Usuario().encrypPass(req.body.password),
            fk_rol: "66f50e7ec44711bd61cbeb2c",
        });


        await newUser.save();

        const token = jwt.sign({ id: newUser._id, username: newUser.username }, JWT_SECRET, { expiresIn: '1h' });


        res.status(201).json({ name: newUser, token });
    } catch (error) {

        res.status(400).json({ mensaje: error.message });
    }
});

routerUser.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;

        // Verificar si el usuario existe y hacer populate para obtener el rol
        const existingUser = await Usuario.findOne({ username }).populate('fk_rol');
        if (!existingUser) {
            return res.status(404).json({ mensaje: "Usuario no encontrado" });
        }

        // Comparar la contraseña proporcionada con la almacenada
        const isMatch = await existingUser.comparePass(password);
        if (!isMatch) {
            return res.status(401).json({ mensaje: "Contraseña incorrecta" });
        }

        // Generar el token JWT con el nombre del rol
        const token = jwt.sign(
            {
                id: existingUser._id,
                username: existingUser.username,
                rol: existingUser.fk_rol.nombre // Suponiendo que el modelo Rol tiene un campo "nombre"
            },
            JWT_SECRET,
            { expiresIn: '1h' }
        );

        // Responder con el usuario y el token
        res.status(200).json({ usuario: existingUser, token });
    } catch (error) {
        console.error("Error al iniciar sesión:", error);
        res.status(500).json({ mensaje: error.message });
    }
});

routerUser.get('/', async (req, res) => {
    try {
        const usuarios = await Usuario.find().populate('fk_rol'); // Puedes hacer populate si necesitas datos del rol
        res.status(200).json(usuarios);
    } catch (error) {
        console.error("Error al obtener usuarios:", error);
        res.status(500).json({ mensaje: error.message });
    }
});
module.exports = routerUser;





// routerUser.post('/', async (req, res) => {
//     try {
//         const existingUser = await Usuario.findOne({ username: req.body.username });
//         if (existingUser) {
//             return res.status(400).json({ mensaje: "El nombre de usuario ya existe" });
//         }

//         const newUser = new Usuario({
//             idUsuario: req.body.idUsuario,
//             nombre: req.body.nombre,
//             apellido: req.body.apellido,
//             email: req.body.email,
//             username: req.body.username,
//             password: await new Usuario().encrypPass(req.body.password),
//             fk_rol: req.body.fk_rol,
//         });

//         await newUser.save();

//         const token = jwt.sign({ id: newUser._id, username: newUser.username }, JWT_SECRET, { expiresIn: '1h' });


//         res.status(201).json({ usuario: newUser, token });
//     } catch (error) {
//         res.status(400).json({ mensaje: error.message });
//     }
// });

// module.exports = routerUser;