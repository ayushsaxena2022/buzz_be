const mongoose = require('mongoose');
const express = require('express');
const router = require('express').Router();
const Feed = require('./models/myfeed');
const commentSchema = require('./models/commentSchema');
const app = express();
const Joi = require("joi");
const dotenv = require("dotenv").config();
const feed = require("./routes/feed");
const userauth = require("./routes/auth.js");
const googleauth=require("./routes/googleauth.js")

  mongoose
  .connect("mongodb://localhost/buzz")
  .then(() => console.log("Connected to MongoDB..."))
  .catch((err) => console.error("Could not connect to MongoDB..."));

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



app.use("/", userauth);
app.use("/auth/google",googleauth);
app.use('/api/comments', require("./routes/comments"));
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));

