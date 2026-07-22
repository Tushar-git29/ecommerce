const express = require("express");
const router = express.Router();
const products = require("../models/database/productsdata.js");
const ac = require("../models/database/acProducts.js");
const womensProducts = require("../models/database/womensProducts.js");
const womensShoesProducts = require("../models/database/womensShoesProducts.js");
const mensProducts = require("../models/database/mensProducts.js");
const mensShoesProducts = require("../models/database/mensShoesProducts.js");
const refrigeratorProducts = require("../models/database/refrigeratorProducts.js");
const tvProducts = require("../models/database/tvProducts.js");
const washingMachineProducts = require("../models/database/washingMachineProducts.js");
const mobileProducts = require("../models/database/mobileProducts.js");
const laptopProducts = require("../models/database/laptopProducts.js");
const electronicsProducts = require("../models/database/electronicsProducts.js");
const earbudsProducts = require("../models/database/earbudsProducts.js");
const cosmeticProducts = require("../models/database/cosmeticProducts.js");
const homeDecorProducts = require("../models/database/homeDecorProducts.js");
const livingRoomProducts = require("../models/database/livingRoomProducts.js");
const cart = require("../models/database/cart.js");


const authMiddleware = require("../middleware/auth");

router.get("/cart", authMiddleware, async (req, res) => {
  const all_products = await cart.find();
  // res.status(200).json(all_products);
  res.json({ message: "Here are your products", user: req.user ,products: all_products});
});

router.post("/cart/:id", authMiddleware, async (req, res) => {
  try {
    const create_product = await cart.create(req.body);
    res.status(201).json(create_product);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.get("/cart/:id", authMiddleware, async (req, res) => {
  try {
    const product = await cart.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json(product);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.delete("/cart/:id", authMiddleware, async (req, res) => {
  try {
    const deletedProduct = await cart.findByIdAndDelete(req.params.id);
    if (!deletedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.patch("/cart/:id", authMiddleware, async (req, res) => {
  try {
    const updatedProduct = await cart.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    res.json(updatedProduct);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});


router.get("/products", authMiddleware, async (req, res) => {
  const all_products = await products.find();
  // res.status(200).json(all_products);
  res.json({ message: "Here are your products", user: req.user ,products: all_products});
});

router.get("/livingRoomProducts", authMiddleware, async (req, res) => {
  const all_products = await livingRoomProducts.find();
  // res.status(200).json(all_products);
  res.json({ message: "Here are your products", user: req.user ,products: all_products});
});

router.get("/mensProducts", authMiddleware, async (req, res) => {
  const all_products = await mensProducts.find();
  // res.status(200).json(all_products);
  res.json({ message: "Here are your products", user: req.user ,products: all_products});
});

router.get("/womensProducts", authMiddleware, async (req, res) => {
  const all_products = await womensProducts.find(); 
  // res.status(200).json(all_products);
  res.json({ message: "Here are your products", user: req.user ,products: all_products});
});

router.get("/ac", authMiddleware, async (req, res) => {
  const all_products = await ac.find();
  // res.status(200).json(all_products);
  res.json({ message: "Here are your products", user: req.user ,products: all_products});
});

router.get("/refrigeratorProducts", authMiddleware, async (req, res) => {
  const all_products = await refrigeratorProducts.find();
  // res.status(200).json(all_products);
  res.json({ message: "Here are your products", user: req.user ,products: all_products});
});

router.get("/tvProducts", authMiddleware, async (req, res) => {
  const all_products = await tvProducts.find();
  // res.status(200).json(all_products);
  res.json({ message: "Here are your products", user: req.user ,products: all_products});
});

router.get("/washingMachineProducts", authMiddleware, async (req, res) => {
  const all_products = await washingMachineProducts.find();
  // res.status(200).json(all_products);
  res.json({ message: "Here are your products", user: req.user ,products: all_products});
});

router.get("/mobileProducts", authMiddleware, async (req, res) => {
  const all_products = await mobileProducts.find();
  // res.status(200).json(all_products);
  res.json({ message: "Here are your products", user: req.user ,products: all_products});
});

router.get("/laptopProducts", authMiddleware, async (req, res) => {
  const all_products = await laptopProducts.find();
  // res.status(200).json(all_products);
  res.json({ message: "Here are your products", user: req.user ,products: all_products});
});

router.get("/electronicsProducts", authMiddleware, async (req, res) => {
  const all_products = await electronicsProducts.find();
  // res.status(200).json(all_products);
  res.json({ message: "Here are your products", user: req.user ,products: all_products});
});

router.get("/earbudsProducts", authMiddleware, async (req, res) => {
  const all_products = await earbudsProducts.find();
  // res.status(200).json(all_products);
  res.json({ message: "Here are your products", user: req.user ,products: all_products});
});

router.get("/cosmeticProducts", authMiddleware, async (req, res) => {
  const all_products = await cosmeticProducts.find();
  // res.status(200).json(all_products);
  res.json({ message: "Here are your products", user: req.user ,products: all_products});
});

router.get("/homeDecorProducts", authMiddleware, async (req, res) => {
  const all_products = await homeDecorProducts.find();  
  // res.status(200).json(all_products);
  res.json({ message: "Here are your products", user: req.user ,products: all_products});
});

router.get("/mensShoesProducts", authMiddleware, async (req, res) => {
  const all_products = await mensShoesProducts.find();  
  // res.status(200).json(all_products);
  res.json({ message: "Here are your products", user: req.user ,products: all_products});
});

router.get("/womensShoesProducts", authMiddleware, async (req, res) => {
  const all_products = await womensShoesProducts.find();
  // res.status(200).json(all_products);
  res.json({ message: "Here are your products", user: req.user ,products: all_products});
});


router.post("/products", authMiddleware, async (req, res) => {

  try {
    let create_product = null;
    if(req.body.productType === "ac"){
      create_product = await ac.create(req.body);
    }
    if(req.body.productType === "womens"){
     create_product = await womensProducts.create(req.body);  
    }
    if(req.body.productType === "womens shoes"){
      create_product = await womensShoesProducts.create(req.body);
    }
    if(req.body.productType === "mens"){
      create_product = await mensProducts.create(req.body);
    }
    if(req.body.productType === "mens shoes"){
      create_product = await mensShoesProducts.create(req.body);
    }
    if(req.body.productType === "refrigerator"){
      create_product = await refrigeratorProducts.create(req.body);
    }
    if(req.body.productType === "tv"){
      create_product = await tvProducts.create(req.body);
    }
    if(req.body.productType === "washing machine"){
      create_product = await washingMachineProducts.create(req.body);
    }
    if(req.body.productType === "mobile"){
      create_product = await mobileProducts.create(req.body);
    }
    if(req.body.productType === "laptop"){
      create_product = await laptopProducts.create(req.body);
    }
    if(req.body.productType === "electronics"){
      create_product = await electronicsProducts.create(req.body);
    }
    if(req.body.productType === "earbuds"){
      create_product = await earbudsProducts.create(req.body);
    }
    if(req.body.productType === "cosmetic"){
      create_product = await cosmeticProducts.create(req.body);
    }
    if(req.body.productType === "homedecor"){
      create_product = await homeDecorProducts.create(req.body);
    }
    
    if(req.body.productType === "living room"){
      create_product = await livingRoomProducts.create(req.body);
    }

    // res.status(201).json({ message: "hello" });

    res
      .status(201)
      .json({ message: "product is uploaded", product_: create_product });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


router.get("/products/:id", authMiddleware, async (req, res) => {
  try {
    const product = await products.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json({
      message: "Here is your product",
      user: req.user,
      product: product
    });

  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

router.get("/mensProducts/:id", authMiddleware, async (req, res) => {
  try {
    const product = await mensProducts.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json({
      message: "Here is your product",
      user: req.user,
      product: product
    });

  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

router.get("/livingRoomProducts/:id", authMiddleware, async (req, res) => {
  try {
    const product = await livingRoomProducts.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json({
      message: "Here is your product",
      user: req.user,
      product: product
    });

  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

router.get("/ac/:id", authMiddleware, async (req, res) => {
  try {
    const product = await ac.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json({
      message: "Here is your product",
      user: req.user,
      product: product
    });

  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

router.get("/womensProducts/:id", authMiddleware, async (req, res) => {
  try {
    const product = await womensProducts.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json({
      message: "Here is your product",
      user: req.user,
      product: product
    });

  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

router.get("/mensShoesProducts/:id", authMiddleware, async (req, res) => {
  try {
    const product = await mensShoesProducts.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json({
      message: "Here is your product",
      user: req.user,
      product: product
    });

  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

router.get("/womensShoesProducts/:id", authMiddleware, async (req, res) => {
  try {
    const product = await womensShoesProducts.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json({
      message: "Here is your product",
      user: req.user,
      product: product
    });

  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

router.get("/washingMachineProducts/:id", authMiddleware, async (req, res) => {
  try {
    const product = await washingMachineProducts.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json({
      message: "Here is your product",
      user: req.user,
      product: product
    });

  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

router.get("/tvProducts/:id", authMiddleware, async (req, res) => {
  try {
    const product = await tvProducts.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json({
      message: "Here is your product",
      user: req.user,
      product: product
    });

  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

router.get("/mobileProducts/:id", authMiddleware, async (req, res) => {
  try {
    const product = await mobileProducts.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json({
      message: "Here is your product",
      user: req.user,
      product: product
    });

  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

router.get("/laptopProducts/:id", authMiddleware, async (req, res) => {
  try {
    const product = await laptopProducts.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json({
      message: "Here is your product",
      user: req.user,
      product: product
    });

  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

router.get("/refrigeratorProducts/:id", authMiddleware, async (req, res) => {
  try {
    const product = await refrigeratorProducts.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json({
      message: "Here is your product",
      user: req.user,
      product: product
    });

  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

router.get("/electronicProducts/:id", authMiddleware, async (req, res) => {
  try {
    const product = await electronicProducts.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json({
      message: "Here is your product",
      user: req.user,
      product: product
    });

  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

router.get("/earbudsProducts/:id", authMiddleware, async (req, res) => {
  try {
    const product = await earbudsProducts.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json({
      message: "Here is your product",
      user: req.user,
      product: product
    });

  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

router.get("/cosmeticProducts/:id", authMiddleware, async (req, res) => {
  try {
    const product = await cosmeticProducts.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json({
      message: "Here is your product",
      user: req.user,
      product: product
    });

  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

router.get("/homeDecorProducts/:id", authMiddleware, async (req, res) => {
  try {
    const product = await homeDecorProducts.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json({
      message: "Here is your product",
      user: req.user,
      product: product
    });

  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});
module.exports = router;
