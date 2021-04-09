const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const morgan = require("morgan");

const port = 3000 || process.env.PORT;

// Middlewares
app.use(bodyParser.json());
app.use(morgan("dev"));

// Calling Database
require("./config/db");

// Calling routes
const userRouter = require("./api/User");
app.use("/user", userRouter);

app.get("/", (req, res) => {
  res.status = 200;
  res.setHeader("Content-Type", "text/html");
  res.end("<h1>hello world</h1>");
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
