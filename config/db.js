const mongoose = require("mongoose");
require('dotenv').config();

mongoose.Promise = global.Promise;

mongoose
  .connect(process.env.URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log("DB Connected");
  })
  .catch((err) => {
    console.log(err);
  });
