const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const orderSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Customer name is required"],
  },
  phone: {
    type: String,
    required: [true, "Customer phone is required"],
  },
  product: {
    type: Schema.Types.ObjectId,
    ref: "Product",
  },
  quantity: {
    type: Number,
    required: [true, "Quantity is required"],
  },
  gross: {
    type: Number,
    required: [true, "Gross is required"],
  },
  tax: {
    type: Number,
    required: [true, "Tax is required"],
  },
  discount: {
    type: Number,
    required: [true, "Discount is required"],
  },
  net: {
    type: Number,
    required: [true, "Net is required"],
  },
  active: {
    type: Boolean,
    default: true,
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

module.exports = mongoose.model("Order", orderSchema);
