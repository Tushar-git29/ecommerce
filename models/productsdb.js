const mongoose = require("mongoose");

const products_schema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    price: {
      type: String,
      required: true,
    },
    product_id: {
      type: String,
      required: true,
      unique: true,
      length: 8,
    },
    img: {
      type: String,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("products", products_schema);
