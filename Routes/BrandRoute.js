const {
  addBrand,
  getAllBrands,
  editBrand,
  searchBrand,
  deleteBrand,
} = require("../Controllers/BrandController");
const router = require("express").Router();

router.post("/add", addBrand);
router.get("/all", getAllBrands);
router.put("/edit", editBrand);
router.post("/search", searchBrand);
router.delete("/delete", deleteBrand);


module.exports = router;