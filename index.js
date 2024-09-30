const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
require("dotenv").config();
const cookieParser = require("cookie-parser");
const authRoute = require("./Routes/AuthRoute");
const brandRoute = require("./Routes/BrandRoute");
const categoryRoute = require("./Routes/CategoryRoute");
const productRoute = require("./Routes/ProductRoute");
const orderRoute = require("./Routes/OrderRoute");
const { MONGO_URL, PORT } = process.env;

mongoose
  .connect(MONGO_URL)
  .then(() => console.log("MongoDB is  connected successfully"))
  .catch((err) => console.error(err));

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});

// app.use(
//   cors({
//     origin: ["http://localhost:3000"],
//     methods: ["GET", "POST", "PUT", "DELETE"],
//     credentials: true,
//   })
// );
app.use(cookieParser());

app.use(express.json());

app.use("/auth", authRoute);
app.use("/brand", brandRoute);
app.use("/category", categoryRoute);
app.use("/product", productRoute);
app.use("/order", orderRoute);