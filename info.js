const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
require("dotenv/config");
app.use(bodyParser.json());
const postsRoute = require("./routes/posts");

app.use("/support/create_ticket", postsRoute);

app.get("/", (req, res) => {
  res.send("we are home");
});

mongoose.connect(
  process.env.DB_CONNECTION,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    console.log("connected to DB");
  }
);

app.listen(3000);
