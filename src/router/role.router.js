const express = require('express');
const Rol = require("../model/rol");

const routerRole = express.Router();

routerRole.get("/", async (req, res) => {
    try {
        const roles = await Rol.find();
        res.status(200).json(roles);
    } catch (error) {
        res.status(500).json({ mensaje: error.message });
    }
});


routerRole.post('/', async (req, res) => {
    try {
        const newRole = new Rol({
            nombre: req.body.nombre,
        });

        await newRole.save();

        res.status(201).json(newRole);
    } catch (error) {
        res.status(400).json({ mensaje: error.message });
    }
});

routerRole.get("/:id", async (req, res) => {
    try {
        const rol = await Rol.findById(req.params.id);
        if (!rol) {
            return res.status(404).json({ mensaje: "Rol no encontrado" });
        }
        res.status(200).json(rol);
    } catch (error) {
        res.status(500).json({ mensaje: error.message });
    }
});

routerRole.put("/:id", async (req, res) => {
    try {
        console.log("ID recibido:", req.params.id);
        console.log("Datos a actualizar:", req.body);

        const updatedRol = await Rol.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedRol) {
            return res.status(404).json({ mensaje: "Rol no encontrado" });
        }
        res.status(200).json(updatedRol);
    } catch (error) {
        console.error("Error al actualizar rol:", error);
        res.status(400).json({ mensaje: error.message });
    }
});

routerRole.delete("/:id", async (req, res) => {
    try {
        const deletedRol = await Rol.findByIdAndDelete(req.params.id);
        if (!deletedRol) {
            return res.status(404).json({ mensaje: "Rol no encontrado" });
        }
        res.status(200).json({ mensaje: "Rol eliminado", rol: deletedRol });
    } catch (error) {
        console.error("Error al eliminar rol:", error);
        res.status(500).json({ mensaje: error.message });
    }
});



module.exports = routerRole;
