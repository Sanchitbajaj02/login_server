const express = require("express");
const router = express.Router();

// password handler
const bcrypt = require("bcrypt");

// Calling user model
const User = require("../models/User");

// Signin route
router.post("/login", (req, res, next) => {
  let { email, password } = req.body;

  email = email.trim();
  password = password.trim();

  if (email === "" || password === "") {
    res.json({
      status: "FAILED",
      message: "Empty credentials supplied!",
    });
  } else {
    // check if user exists
    User.find({ email })
      .then((data) => {
        if (data.length) {
          // user exists
          const hashPass = data[0].password;
          bcrypt
            .compare(password, hashPass)
            .then((result) => {
              if (result) {
                // Password match
                res.json({
                  status: "SUCCESS",
                  message: "Signin Successful",
                  data: data,
                });
              } else {
                res.json({
                  status: "FAILED",
                  message: "Invalid Password Entered!",
                });
              }
            })
            .catch((err) => {
              res.json({
                status: "FAILED",
                message: "An error occured while comparing",
              });
            });
        } else {
          res.json({
            status: "FAILED",
            message: "Empty credentials entered!",
          });
        }
      })
      .catch((err) => {
        res.json({
          status: "FAILED",
          message: "An error occured while checking for existing user",
        });
      });
  }
});

module.exports = router;
