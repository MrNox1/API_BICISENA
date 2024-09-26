const Bicycle = require("../model/Bicycle");

async function addBicyle(req, res) {
  try {
    const { name, fk_brand, fk_bicycleStatus, color, description, image } =
      req.body;

    if (!name || !fk_brand || !fk_bicycleStatus) {
      return res.status(400).json({
        mensaje:
          "Los campos 'name', 'fk_brand' y 'fk_bicycleStatus' son requeridos.",
      });
    }

    const newBicycle = new Bicycle({
      name,
      fk_brand,
      fk_bicycleStatus,
      color,
      description,
      image,
    });
    await newBicycle.save();
    res.status(201).json(newBicycle);
  } catch (error) {
    res.status(400).json({ mensaje: error.message });
  }
}

async function getAllBicyle(req, res) {
  try {
    const bicycles = await Bicycle.find().populate("fk_brand fk_bicycleStatus");
    res.status(200).json(bicycles);
  } catch (error) {
    res.status(500).json({ mensaje: error.message });
  }
}

async function getBicyleById(req, res) {
  try {
    const bicycle = await Bicycle.findById(req.params.id).populate(
      "fk_brand fk_bicycleStatus"
    );
    if (!bicycle) {
      return res.status(404).json({ mensaje: "Bicicleta no encontrada" });
    }
    res.status(200).json(bicycle);
  } catch (error) {
    res.status(500).json({ mensaje: error.message });
  }
}

async function deletedBicycleById(req, res) {
  try {
    const deletedBicycle = await Bicycle.findByIdAndDelete(req.params.id);
    if (!deletedBicycle) {
      return res.status(404).json({ mensaje: "Bicicleta no encontrada" });
    }
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ mensaje: error.message });
  }
}

module.exports = {
  addBicyle,
  getAllBicyle,
  getBicyleById,
  deletedBicycleById,
};
