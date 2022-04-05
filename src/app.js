const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Joi = require("joi");

mongoose
  .connect("mongodb://localhost/buzz")
  .then(() => console.log("Connected to MongoDB..."))
  .catch((err) => console.error("Could not connect to MongoDB..."));

const port = 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
