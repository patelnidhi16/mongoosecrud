const mongoose = require("mongoose");
const validator = require("validator");
const studentschema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 20,
  },
  email: {
    type: String,
    required: true,
    maxlength: 200,
    validator(value) {
      if (!validator.isEmail(value)) {
        throw new Error("invalid email");
      }
    },
  },
  mobile: {
    type: Number,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
});

const Student = new mongoose.model("Student", studentschema);

module.exports = Student;
