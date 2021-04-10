const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const morgan = require("morgan");

let port = process.env.PORT || 3000;

// Middlewares
app.use(bodyParser.json());
app.use(morgan("dev"));

// Calling Database
require("./config/db");

// Calling routes
const loginRouter = require("./api/Login");
app.use("/user", loginRouter);

const signupRouter = require("./api/Signup");
app.use("/user", signupRouter);

app.use(express.static('public'));

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
