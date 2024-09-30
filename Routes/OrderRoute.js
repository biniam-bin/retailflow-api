const {
    addOrder,
    getAllOrders,
    editOrder,
    searchOrder,
    deleteOrder,
  } = require("../Controllers/OrderController");
  const router = require("express").Router();
  
  router.post("/add", addOrder);
  router.get("/all", getAllOrders);
  router.put("/edit", editOrder);
  router.post("/search", searchOrder);
  router.delete("/delete", deleteOrder);
  
  
  module.exports = router;
  