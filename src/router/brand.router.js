const express = require('express');
const Brand = require("../model/Brand");


const routerBrand = express.Router();

routerBrand.post('/', async (req, res) => {
    try {
        const { name } = req.body;

        const newBrand = new Brand({
            name,
        });

        await newBrand.save();
        res.status(201).json(newBrand);
    } catch (error) {
        res.status(400).json({ mensaje: error.message });
    }
});

routerBrand.delete('/:id', async (req, res) => {
    try {
        const deletedBrand = await Brand.findByIdAndDelete(req.params.id);
        if (!deletedBrand) {
            return res.status(404).json({ mensaje: "Marca no encontrada" });
        }
        res.status(200).json({ mensaje: "Marca eliminada exitosamente" });
    } catch (error) {
        res.status(500).json({ mensaje: error.message });
    }
});


routerBrand.put('/:id', async (req, res) => {
    try {
        const { nombre } = req.body;
        const updatedBrand = await Brand.findByIdAndUpdate(
            req.params.id,
            { nombre },
            { new: true }
        );
        if (!updatedBrand) {
            return res.status(404).json({ mensaje: "Marca no encontrada" });
        }
        res.status(200).json(updatedBrand);
    } catch (error) {
        res.status(400).json({ mensaje: error.message });
    }
});

routerBrand.get('/', async (req, res) => {
    try {
        const brands = await Brand.find(); // Obtiene todas las marcas
        res.status(200).json(brands);
    } catch (error) {
        res.status(500).json({ mensaje: error.message });
    }
});


module.exports = routerBrand