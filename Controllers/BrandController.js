const Brand = require("../Models/BrandModel");
require("dotenv").config();
const jwt = require("jsonwebtoken");

module.exports.addBrand = async (req, res, next) => {
  try {
    const { name, active } = req.body;
    jwt.verify(req.cookies.token, process.env.TOKEN_KEY, async (err, data) => {
      if (err) {
        return res.status(401).json({ status: false });
      } else {
        const brand = await Brand.create({ name, active, owner: data.id })
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

module.exports.getAllBrands = async (req, res) => {
  jwt.verify(req.cookies.token, process.env.TOKEN_KEY, async (err, data) => {
    try {
      const brands = await Brand.find({ owner: data.id });
      if (brands) {
        res.status(200).json({ brands });
      } else {
        res.status(404).json({ message: "No brands found" });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
};

module.exports.searchBrand = async (req, res) => {
  jwt.verify(req.cookies.token, process.env.TOKEN_KEY, async (err, data) => {
    try {
      const brands = await Brand.find({
        owner: data.id,
        name: { $regex: req.body.query, $options: "i" },
      });
      if (brands) {
        res.status(200).json({ brands });
      } else {
        res.status(404).json({ message: "No brands found" });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
};

module.exports.editBrand = async (req, res) => {
  jwt.verify(req.cookies.token, process.env.TOKEN_KEY, async (err, data) => {
    try {
      const brand = await Brand.findById(req.body.id);

      if (brand.owner == data.id) {
        await Brand.findByIdAndUpdate(req.body.id, {
          name: req.body.name,
          active: req.body.active,
        })
          .then(() => {
            res.status(200).json({ mssage: "success" });
          })
          .catch((error) => {
            res.status(500).json({ message: "ubable to update" });
          });
      } else {
        res.status(403).json({ message: "not authorized" });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
};

module.exports.deleteBrand = async (req, res) => {
  jwt.verify(req.cookies.token, process.env.TOKEN_KEY, async (err, data) => {
    try {
      const brand = await Brand.findById(req.body.id);

      if (brand.owner == data.id) {
        await Brand.findByIdAndDelete(req.body.id)
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
