require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const userauth = require("./routes/auth.js");

const googleauth=require("./routes/googleauth.js")


mongoose
  .connect("mongodb://localhost/buzz")
  .then(() => console.log("Connected to MongoDB..."))
  .catch((err) => console.error("Could not connect to MongoDB..."));

// process.on("uncaughtException", err => res.status(401).send(err))
const PORT = process.env.PORT

app.use(express.json());
app.use("/", userauth);
app.use("/auth/google",googleauth);
app.use((err, req, res, next) => {
  res.status(500).send("" + err);


});










app.listen(PORT, () => console.log(`Listening on port ${PORT}...`));
