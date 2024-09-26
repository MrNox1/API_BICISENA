const express = require("express");
const Discount = require("../model/Discount.js");

const routerDiscount = express.Router();

routerDiscount.post("/", async (req, res) => {
  try {
    const { category, value } = req.body;

    const newDiscount = new Discount({ category, value });
    await newDiscount.save();
    res.status(201).json(newDiscount);
  } catch (error) {
    res.status(400).json({ mensaje: error.message });
  }
});

routerDiscount.get("/", async (req, res) => {
  try {
    const discounts = await Discount.find();
    res.status(200).json(discounts);
  } catch (error) {
    res.status(500).json({ mensaje: error.message });
  }
});

routerDiscount.get("/:id", async (req, res) => {
  try {
    const discount = await Discount.findById(req.params.id);
    if (!discount) {
      return res.status(404).json({ mensaje: "Descuento no encontrado" });
    }
    res.status(200).json(discount);
  } catch (error) {
    res.status(500).json({ mensaje: error.message });
  }
});

routerDiscount.put("/:id", async (req, res) => {
  try {
    const updatedDiscount = await Discount.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedDiscount) {
      return res.status(404).json({ mensaje: "Descuento no encontrado" });
    }
    res.status(200).json(updatedDiscount);
  } catch (error) {
    res.status(400).json({ mensaje: error.message });
  }
});

routerDiscount.delete("/:id", async (req, res) => {
  try {
    const deletedDiscount = await Discount.findByIdAndDelete(req.params.id);
    if (!deletedDiscount) {
      return res.status(404).json({ mensaje: "Descuento no encontrado" });
    }
    res
      .status(200)
      .json({ mensaje: "Descuento eliminado", descuento: deletedDiscount });
  } catch (error) {
    res.status(500).json({ mensaje: error.message });
  }
});

module.exports = routerDiscount;
