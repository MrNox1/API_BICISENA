const express = require("express");
const CycleRidesRegistration = require("../model/CycleRidesRegistration");

const router = express.Router();

// Crear ciclo paseo
router.post("/", async (req, res) => {
  try {
    const newCycleRide = new CycleRidesRegistration(req.body);
    await newCycleRide.save();
    res.status(201).json(newCycleRide);
  } catch (error) {
    res.status(400).json({ mensaje: error.message });
  }
});

// Obtener todos los ciclo paseos con nombres de estaciones
router.get("/", async (req, res) => {
  try {
    const cycleRides = await CycleRidesRegistration.find()
      .populate("estacionInit", "nombre") // Solo trae el campo nombre de la estación inicial
      .populate("endingStation", "nombre"); // Solo trae el campo nombre de la estación final

    res.status(200).json(cycleRides);
  } catch (error) {
    res.status(500).json({ mensaje: error.message });
  }
});

// Obtener ciclo paseo por ID
router.get("/:id", async (req, res) => {
  try {
    const cycleRide = await CycleRidesRegistration.findById(req.params.id)
      .populate("estacionInit", "nombre")
      .populate("endingStation", "nombre");

    if (!cycleRide) {
      return res.status(404).json({ mensaje: "Ciclo paseo no encontrado" });
    }
    res.status(200).json(cycleRide);
  } catch (error) {
    res.status(500).json({ mensaje: error.message });
  }
});

// Actualizar ciclo paseo por ID
router.put("/:id", async (req, res) => {
  try {
    const updatedCycleRide = await CycleRidesRegistration.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedCycleRide) {
      return res.status(404).json({ mensaje: "Ciclo paseo no encontrado" });
    }
    res.status(200).json(updatedCycleRide);
  } catch (error) {
    res.status(400).json({ mensaje: error.message });
  }
});

// Eliminar ciclo paseo por ID
router.delete("/:id", async (req, res) => {
  try {
    const deletedCycleRide = await CycleRidesRegistration.findByIdAndDelete(
      req.params.id
    );
    if (!deletedCycleRide) {
      return res.status(404).json({ mensaje: "Ciclo paseo no encontrado" });
    }
    res.status(200).json({ mensaje: "Ciclo paseo eliminado" });
  } catch (error) {
    res.status(500).json({ mensaje: error.message });
  }
});

module.exports = router;
