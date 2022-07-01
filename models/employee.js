const mongoose = require("mongoose");
const validator = require("validator");
const Employeeschema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "this field are required"],
    minlength: [2, `name should have a minimum length of 2`],
    maxlength: [20, "name should have a maximum length of 20"],
    validate: {
      validator: (val) => validator.isAlpha(val, ["en-US"], { ignore: " -" }), //" =" => " " & "-"
      message: "name must only contain characters between A-Z",
    },
  },
  email: {
    type: String,
    required: [true, "this field are required"],
    maxlength: [255, `name should have a maximum length of 255`],
    validator(value) {
      if (!validator.isEmail(value)) {
        throw new Error("invalid email");
      }
    },
    match: /.+\@.+\..+/,
    unique: [true, "this email already exist"],
  },
  mobile: {
    type: Number,
    required: [true, "this field are required"],
  },
  address: {
    type: String,
    required: [true, "this field are required"],
  },
});

const Employee = new mongoose.model("Employee", Employeeschema);

module.exports = Employee;
