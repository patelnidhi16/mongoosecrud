const express = require("express");
const mongoose = require("mongoose");

require("../db/conn");
const app = express();
var bodyParser = require("body-parser");
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
app.use(bodyParser.json());
const port = process.env.PORT || 3000;
const Student = require("../models/students");
const Employee = require("../models/employee");
app.get("/delete/:id", async (req, res) => {
  var employee = await Employee.deleteOne({ _id: req.params.id });
  if (employee) {
    res.send(employee);
  }
});
app.get("/delete", async (req, res) => {
  var employee = await Employee.deleteMany({});
  if (employee) {
    res.send(employee);
  }
});
app.get("/find/:id", async (req, res) => {
  await Employee.findOne({ _id: req.params.id }, function (err, data) {
    if (err) {
      res.json(err);
    } else {
      res.json(data);
    }
  });
});
app.get("/index", (req, res) => {
  const addEmployee = async () => {
    try {
      const result = await Employee.find();
      res.json(result);
    } catch (error) {
      console.log(error);
    }
  };
  addEmployee();
});
app.post("/create", (req, res) => {
  const addEmployee = async () => {
    try {
      if (req.body.id) {
        const result1 = await Employee.updateOne(
          { _id: req.body.id },
          {
            $set: {
              name: req.body.name,
              email: req.body.email,
              mobile: req.body.mobile,
              address: req.body.address,
            },
          }
        );
        res.json(req.body);
      } else {
        const result = await Employee.create({
          name: req.body.name,
          email: req.body.email,
          mobile: req.body.mobile,
          address: req.body.address,
        });
        res.json(result);
      }
    } catch (error) {
      if (error.name === "ValidationError") {
        let err = {};
        Object.keys(error.errors).forEach((key) => {
          err[key] = error.errors[key].message;
        });
        return res.status(400).send(err);
      }
    }
  };
  addEmployee();
});

app.listen(port, () => {
  console.log("success");
});
