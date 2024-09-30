const Order = require("../Models/OrderModel");
require("dotenv").config();
const jwt = require("jsonwebtoken");

module.exports.addOrder = async (req, res) => {
  const { name, phone, product, quantity, gross, tax, discount, active } =
    req.body;
  jwt.verify(req.cookies.token, process.env.TOKEN_KEY, async (err, data) => {
    if (err) {
      return res.status(401).json({ status: false });
    } else {
      const net = gross + (gross * tax) / 100 - (gross * discount) / 100;
      const brand = await Order.create({
        name,
        phone,
        product,
        quantity,
        gross,
        tax,
        discount,
        net,
        owner: data.id,
        active,
      })
        .then(() => {
          res.status(201).json({ message: "created", status: "success" });
        })
        .catch((error) => res.status(500).json({ message: error._message }));
    }
  });
};

module.exports.getAllOrders = async (req, res) => {
  jwt.verify(req.cookies.token, process.env.TOKEN_KEY, async (err, data) => {
    try {
      const orders = await Order.find({ owner: data.id });
      if (orders) {
        res.status(200).json({ orders });
      } else {
        res.status(404).json({ message: "No orders found" });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
};

module.exports.searchOrder = async (req, res) => {
  jwt.verify(req.cookies.token, process.env.TOKEN_KEY, async (err, data) => {
    try {
      const orders = await Order.find({
        owner: data.id,
        name: { $regex: req.body.query, $options: "i" },
      });
      if (orders) {
        res.status(200).json({ orders });
      } else {
        res.status(404).json({ message: "No orders found" });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
};

module.exports.editOrder = async (req, res) => {
  const { name, phone, product, quantity, gross, tax, discount, active } =
    req.body;
  jwt.verify(req.cookies.token, process.env.TOKEN_KEY, async (err, data) => {
    try {
      const order = await Order.findById(req.body.id);

      if (order.owner == data.id) {
        await Order.findByIdAndUpdate(req.body.id, {
          name,
          phone,
          product,
          quantity,
          gross,
          tax,
          discount,
          active,
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

module.exports.deleteOrder = async (req, res) => {
  jwt.verify(req.cookies.token, process.env.TOKEN_KEY, async (err, data) => {
    try {
      const order = await Order.findById(req.body.id);

      if (order.owner == data.id) {
        await Order.findByIdAndDelete(req.body.id)
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
