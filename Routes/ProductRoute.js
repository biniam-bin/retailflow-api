const {
    addProduct,
    getAllProducts,
    editProduct,
    searchProduct,
    deleteProduct,
  } = require("../Controllers/ProductController");
  const router = require("express").Router();
  
  router.post("/add", addProduct);
  router.get("/all", getAllProducts);
  router.put("/edit", editProduct);
  router.post("/search", searchProduct);
  router.delete("/delete", deleteProduct);
  
  
  module.exports = router;
  