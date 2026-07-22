const mongoose = require("mongoose");

const cart_schema = new mongoose.Schema(
  {
    productName: {
      type: String,
      required: true,
    },
    productBrand: {
      type: String,
      required: true,
    },
    productType: {
      type: String,
      required: true,
    },
    img1: {
      type: String,
      required: true,
    },
    img2: {
      type: String,
    },
    img3: {
      type: String,
    },
    productPrice: {
      type: Number,
      required: true,
    },
    productSize:{
      type: String,
    },
    productColour:{
      type: String,
    },
    
    productDescription:{
      type: String,
      required: true,
    },
    productQuantity:{
      type: Number,
      required: true,}
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("cart", cart_schema);
