const express = require('express');
const BicycleStatus = require("../model/BicycleStatus");

const routerBicycleStatus = express.Router();




routerBicycleStatus.post('/', async (req, res) => {
    try {
        const { type } = req.body;


        if (!type) {
            return res.status(400).json({ mensaje: "El campo 'type' es requerido." });
        }

        const newStatus = new BicycleStatus({ type });
        await newStatus.save();
        res.status(201).json(newStatus);
    } catch (error) {
        res.status(400).json({ mensaje: error.message });
    }
});

// Obtener todos los estados
routerBicycleStatus.get('/', async (req, res) => {
    try {
        const statuses = await BicycleStatus.find();
        res.status(200).json(statuses);
    } catch (error) {
        res.status(500).json({ mensaje: error.message });
    }
});

// Actualizar estado por ID
routerBicycleStatus.put('/:id', async (req, res) => {
    try {
        const { type } = req.body;
        const updatedStatus = await BicycleStatus.findByIdAndUpdate(req.params.id, { type }, { new: true });
        if (!updatedStatus) {
            return res.status(404).json({ mensaje: "Estado no encontrado" });
        }
        res.status(200).json(updatedStatus);
    } catch (error) {
        res.status(400).json({ mensaje: error.message });
    }
});

// Eliminar estado por ID
routerBicycleStatus.delete('/:id', async (req, res) => {
    try {
        const deletedStatus = await BicycleStatus.findByIdAndDelete(req.params.id);
        if (!deletedStatus) {
            return res.status(404).json({ mensaje: "Estado no encontrado" });
        }
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ mensaje: error.message });
    }
});

module.exports = routerBicycleStatus;

