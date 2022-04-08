const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Joi = require("joi");
const dotenv = require("dotenv").config();
const feed = require("./routes/feed");

app.use(express.json());
app.use("/api/feed", feed);
process.on('uncaughtException', (ex) => {
  console.log("We got uncaught exception", ex);
  process.exit(1);
})

app.use((err, req, res, next) => {
  console.error(err)
  res.status(500).send('' + err)
})

mongoose
  .connect("mongodb://localhost/buzz")
  .then(() => console.log("Connected to MongoDB..."))
  .catch((err) => console.error("Could not connect to MongoDB..."));

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
