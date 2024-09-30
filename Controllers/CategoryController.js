const Category = require("../Models/CategoryModel");
require("dotenv").config();
const jwt = require("jsonwebtoken");

module.exports.addCategory = async (req, res, next) => {
  try {
    const { name, active } = req.body;
    jwt.verify(req.cookies.token, process.env.TOKEN_KEY, async (err, data) => {
      if (err) {
        return res.status(401).json({ status: false });
      } else {
        const category = Category.create({ name, active, owner: data.id })
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

module.exports.getAllCategories = async (req, res) => {
  jwt.verify(req.cookies.token, process.env.TOKEN_KEY, async (err, data) => {
    try {
      const categories = await Category.find({ owner: data.id });
      if (categories) {
        res.status(200).json({ categories });
      } else {
        res.status(404).json({ message: "No categories found" });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
};

module.exports.searchCategory = async (req, res) => {
  jwt.verify(req.cookies.token, process.env.TOKEN_KEY, async (err, data) => {
    try {
      const categories = await Category.find({
        owner: data.id,
        name: { $regex: req.body.query, $options: "i" },
      });
      if (categories) {
        res.status(200).json({ categories });
      } else {
        res.status(404).json({ message: "No categories found" });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
};

module.exports.editCategory = async (req, res) => {
  jwt.verify(req.cookies.token, process.env.TOKEN_KEY, async (err, data) => {
    try {
      const category = await Category.findById(req.body.id);

      if (category.owner == data.id) {
        await Category.findByIdAndUpdate(req.body.id, {
          name: req.body.name,
          active: req.body.active,
        })
          .then(() => {
            res.status(200).json({ mssage: "success" });
          })
          .catch((error) => {
            res.status(500).json({ message: "unabable to update" });
          });
      } else {
        res.status(403).json({ message: "not authorized" });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
};

module.exports.deleteCategory = async (req, res) => {
  jwt.verify(req.cookies.token, process.env.TOKEN_KEY, async (err, data) => {
    try {
      const category = await Category.findById(req.body.id);

      if (category.owner == data.id) {
        await Category.findByIdAndDelete(req.body.id)
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
