const {
    addCategory,
    getAllCategories,
    editCategory,
    searchCategory,
    deleteCategory,
  } = require("../Controllers/CategoryController");
  const router = require("express").Router();
  
  router.post("/add", addCategory);
  router.get("/all", getAllCategories);
  router.put("/edit", editCategory);
  router.post("/search", searchCategory);
  router.delete("/delete", deleteCategory);
  
  
  module.exports = router;
  