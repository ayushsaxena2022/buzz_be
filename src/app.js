const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const feed = require("./routes/feed");
const userauth = require("./routes/auth.js");
const googleauth=require("./routes/googleauth.js")
const forgotpassword=require("./routes/forgotpassword.js");
var cookieParser = require('cookie-parser');


   mongoose
  .connect("mongodb://localhost/buzz")
  .then(() => console.log("Connected to MongoDB..."))
  .catch((err) => console.error("Could not connect to MongoDB..."));

app.use(express.json());
app.use(cookieParser());
app.use("/api/feed", feed);
app.use("/api", userauth);
app.use("/auth/google",googleauth);
app.use("/api/forgotpassword",forgotpassword);
app.use((err, req, res, next) => {
  console.error(err)
  res.status(500).send('' + err)
})




process.on('uncaughtException', (ex) => {
  console.log("We got uncaught exception", ex);
  process.exit(1);
})




const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));

