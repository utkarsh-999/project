const product = require("../controller/products.controller");
const router = require("express").Router();

router.post("/createProduct", product.createProduct);
router.get("/byCat", product.byCategory);

module.exports = router;
