const product = require("../controller/products.controller");
const router = require("express").Router();

router.post("/createProduct", product.createProduct);
router.get("/byCat/:category", product.byCategory);
router.get("/getAll", product.getAll);
router.delete("/deleteProduct/:productId", product.deleteProduct);
router.post("/addReview", product.addReview);

module.exports = router;
