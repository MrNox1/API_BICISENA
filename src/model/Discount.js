const mongoose = require("mongoose");

const discountSchema = new mongoose.Schema({
  category: {
    type: String,
    required: false,
    maxlength: 50,
  },
  value: {
    type: mongoose.Decimal128,
    required: false,
  },
});

const Discount = mongoose.model("Discount", discountSchema);

module.exports = Discount;
