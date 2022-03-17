const express = require("express");
const Users = require("./routes/user.routes");
const Products = require("./routes/products.routes");
const Cart = require("./routes/cart.routes");
const app = express();
require("./config/db");

app.use(express.json());

app.use("/api", Users);
app.use("/api", Products);
app.use("/api", Cart);

app.get("/", (req, res) => {
  res.send("hello");
  console.log("Hello");
});

app.listen(3000, (req, res) => {
  console.log("server running at 3000");
});
