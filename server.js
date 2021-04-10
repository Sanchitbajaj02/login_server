const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const morgan = require("morgan");

const port = process.env.PORT || 3000;

// Middlewares
app.use(bodyParser.json());
app.use(morgan("dev"));

// Calling Database
require("./config/db");

// Calling routes
const userRouter = require("./api/User");
app.use("/user", userRouter);

app.use(express.static('public'));

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
