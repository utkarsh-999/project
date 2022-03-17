const cart = require("../controller/cart.controller");
const router = require("express").Router();

router.post("/add", cart.addToCart);
router.delete("/delete", cart.deleteFromCart);
router.get("/cart", cart.viewCart);

module.exports = router;
