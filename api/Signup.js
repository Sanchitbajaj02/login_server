const express = require("express");
const router = express.Router();

// password handler
const bcrypt = require("bcrypt");

// Calling user model
const User = require("../models/User");

// Signup route
router.post("/signup", (req, res, next) => {
  let { name, email, password, dateOfBirth } = req.body;
  name = name.trim();
  email = email.trim();
  password = password.trim();
  dateOfBirth = dateOfBirth.trim();

  if (name === "" || email === "" || password === "" || dateOfBirth === "") {
    res.json({
      status: "FAILED",
      message: "Empty input fields!",
    });
  } else if (/^[a-zA-Z]*$/.test(name)) {
    res.json({
      status: "FAILED",
      message: "Invalid name entered",
    });
  } else if (/^w+[+.w-]*@([w-]+.)*w+[w-]*.([a-z]{2,4}|d+)$/i.test(email)) {
    res.json({
      status: "FAILED",
      message: "Invalid email entered",
    });
  } else if (!new Date(dateOfBirth).getTime()) {
    res.json({
      status: "FAILED",
      message: "Invalid date of birth entered",
    });
  } else if (password.length < 8) {
    res.json({
      status: "FAILED",
      message: "Password is too short!",
    });
  } else {
    // checking if user already exists
    User.find({ email })
      .then((result) => {
        if (result.length) {
          // user exists
          res.json({
            status: "FAILED",
            message: "User with the provided email already exists in database",
          });
        } else {
          // password handling
          const saltRounds = 10;
          bcrypt
            .hash(password, saltRounds)
            .then((hashedPass) => {
              const newUser = new User({
                name,
                email,
                password: hashedPass,
                dateOfBirth,
              });

              newUser
                .save()
                .then((result) => {
                  res.json({
                    status: "SUCCESS",
                    message: "Signup Successful",
                    data: result,
                  });
                })
                .catch((err) => {
                  res.json({
                    status: "FAILED",
                    message: "An error occurred while saving user account!",
                  });
                });
            })
            .catch((err) => {
              res.json({
                status: "FAILED",
                message:
                  "An error occured while hashing the password for new user!",
              });
            });
        }
      })
      .catch((err) => {
        console.log(err);
        res.json({
          status: "FAILED",
          message: "An error occured while checking for existing user!",
        });
      });
  }
});

module.exports = router;