const mongoose = require("mongoose");
mongoose
  .connect("mongodb://localhost:27017/students-api")
  .then(() => console.log("success"))
  .catch((err) => console.log(err));
