const user = require("../controller/users.controller");
const router = require("express").Router();

router.post("/register", user.registerUser);
router.post("/login", user.loginUser);

module.exports = router;
