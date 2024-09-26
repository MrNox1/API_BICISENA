const express = require("express");
const RentRegistration = require("../model/RentRegistration.js");

const routerRentRegistration = express.Router();

routerRentRegistration.post("/", async (req, res) => {
  try {
    const {
      nombreRegistro,
      fk_bici,
      fk_estacionInicial,
      fk_estacionFinal,
      fecha,
      estado,
      distancia,
      fk_descuento,
      fk_usuario,
      precioTotal,
    } = req.body;

    const newRegistro = new Registro({
      nombreRegistro,
      fk_bici,
      fk_estacionInicial,
      fk_estacionFinal,
      fecha,
      estado,
      distancia,
      fk_descuento,
      fk_usuario,
      precioTotal,
    });
    await newRegistro.save();
    res.status(201).json(newRegistro);
  } catch (error) {
    res.status(400).json({ mensaje: error.message });
  }
});

routerRentRegistration.get("/", async (req, res) => {
  try {
    const registros = await RentRegistration.find();
    res.status(200).json(registros);
  } catch (error) {
    res.status(500).json({ mensaje: error.message });
  }
});

routerRentRegistration.get("/:id", async (req, res) => {
  try {
    const registro = await RentRegistration.findById(req.params.id);
    if (!registro) {
      return res.status(404).json({ mensaje: "Registro no encontrado" });
    }
    res.status(200).json(registro);
  } catch (error) {
    res.status(500).json({ mensaje: error.message });
  }
});

routerRentRegistration.put("/:id", async (req, res) => {
  try {
    const updatedRegistro = await RentRegistration.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedRegistro) {
      return res.status(404).json({ mensaje: "Registro no encontrado" });
    }
    res.status(200).json(updatedRegistro);
  } catch (error) {
    res.status(400).json({ mensaje: error.message });
  }
});

routerRentRegistration.delete("/:id", async (req, res) => {
  try {
    const deletedRegistro = await RentRegistration.findByIdAndDelete(
      req.params.id
    );
    if (!deletedRegistro) {
      return res.status(404).json({ mensaje: "Registro no encontrado" });
    }
    res
      .status(200)
      .json({ mensaje: "Registro eliminado", registro: deletedRegistro });
  } catch (error) {
    res.status(500).json({ mensaje: error.message });
  }
});

module.exports = routerRentRegistration;
