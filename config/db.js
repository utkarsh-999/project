const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost:27017/project", {
    useNewUrlParser: true,
  })
  .then(() => console.log("database successfully connected "))
  .catch((err) => {
    console.log(err);
    process.exit(1);
  });
