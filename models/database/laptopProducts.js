const mongoose = require("mongoose");

const productsdata_schema = new mongoose.Schema(
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
      required: true,
    },
     productColour:{
      type: String,
    },
    
    productDescription:{
      type: String,
      required: true,
    }
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("laptopProducts", productsdata_schema);
