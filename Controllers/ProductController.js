const Product = require("../Models/ProductModel");
require("dotenv").config();
const jwt = require("jsonwebtoken");

module.exports.addProduct = async (req, res, next) => {
  const { name, brand, category, price, quantity, active } = req.body;
  try {
    jwt.verify(req.cookies.token, process.env.TOKEN_KEY, async (err, data) => {
      if (err) {
        return res.status(401).json({ status: false });
      } else {
        const product = await Product.create({
          name,
          brand,
          category,
          price,
          quantity,
          owner: data.id,
          active,
        })
          .then(() => {
            res.status(201).json({ message: "created", status: "success" });
          })
          .catch((error) => res.status(500).json({ message: error._message }));
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports.getAllProducts = async (req, res) => {
  jwt.verify(req.cookies.token, process.env.TOKEN_KEY, async (err, data) => {
    try {
      const products = await Product.find({ owner: data.id });
      if (products) {
        res.status(200).json({ products });
      } else {
        res.status(404).json({ message: "No products found" });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
};

module.exports.searchProduct = async (req, res) => {
  jwt.verify(req.cookies.token, process.env.TOKEN_KEY, async (err, data) => {
    try {
      const products = await Product.find({
        owner: data.id,
        name: { $regex: req.body.query, $options: "i" },
      });
      if (products) {
        res.status(200).json({ products });
      } else {
        res.status(404).json({ message: "No products found" });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
};

module.exports.editProduct = async (req, res) => {
  jwt.verify(req.cookies.token, process.env.TOKEN_KEY, async (err, data) => {
    try {
      const brand = await Product.findById(req.body.id);

      if (brand.owner == data.id) {
        await Product.findByIdAndUpdate(req.body.id, {
          name: req.body.name,
          brand: req.body.brand,
          category: req.body.category,
          price: req.body.price,
          quantity: req.body.quantity,
          active: req.body.active,
        })
          .then(() => {
            res.status(200).json({ mssage: "success" });
          })
          .catch((error) => {
            res.status(500).json({ message: error });
          });
      } else {
        res.status(403).json({ message: "not authorized" });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
};

module.exports.deleteProduct = async (req, res) => {
  jwt.verify(req.cookies.token, process.env.TOKEN_KEY, async (err, data) => {
    try {
      const brand = await Product.findById(req.body.id);

      if (brand.owner == data.id) {
        await Product.findByIdAndDelete(req.body.id)
          .then(() => {
            res.status(200).json({ mssage: "success" });
          })
          .catch((error) => {
            res.status(500).json({ message: "ubable to delete" });
          });
      } else {
        res.status(403).json({ message: "not authorized" });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
};
