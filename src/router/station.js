const express = require("express");
const Station = require("../model/Station");

const routerStation = express.Router();

routerStation.get("/", async (req, res) => {
  try {
    const stations = await Station.find();
    res.status(200).json(stations);
  } catch (error) {
    res.status(500).json({ mensaje: error.message });
  }
});

routerStation.post("/", async (req, res) => {
  try {
    const newStation = new Station({
      nombre: req.body.nombre,
      direccion: req.body.direccion,
      coordenadas: req.body.coordenadas,
      estado: req.body.estado,
    });

    await newStation.save();

    res.status(201).json(newStation);
  } catch (error) {
    res.status(400).json({ mensaje: error.message });
  }
});

routerStation.get("/:id", async (req, res) => {
  try {
    const station = await Station.findById(req.params.id);
    if (!station) {
      return res.status(404).json({ mensaje: "Estación no encontrada" });
    }
    res.status(200).json(station);
  } catch (error) {
    res.status(500).json({ mensaje: error.message });
  }
});

routerStation.put("/:id", async (req, res) => {
  try {
    console.log("ID recibido:", req.params.id);
    console.log("Datos a actualizar:", req.body);

    const updatedStation = await Station.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedStation) {
      return res.status(404).json({ mensaje: "Estación no encontrada" });
    }
    res.status(200).json(updatedStation);
  } catch (error) {
    console.error("Error al actualizar estación:", error);
    res.status(400).json({ mensaje: error.message });
  }
});

routerStation.delete("/:id", async (req, res) => {
  try {
    const deletedStation = await Station.findByIdAndDelete(req.params.id);
    if (!deletedStation) {
      return res.status(404).json({ mensaje: "Estación no encontrada" });
    }
    res
      .status(200)
      .json({ mensaje: "Estación eliminada", estacion: deletedStation });
  } catch (error) {
    console.error("Error al eliminar estación:", error);
    res.status(500).json({ mensaje: error.message });
  }
});

module.exports = routerStation;
