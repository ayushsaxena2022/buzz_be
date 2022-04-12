const mongoose = require('mongoose');
const express = require('express');
const comments = require('./routes/comments');
const router = require('express').Router();
const Feed = require('./models/myfeed');
const friendslist = require ("./routes/friendslist");
const comment = require('./models/comment');
const friendlist = require('./models/friendlist');
const app = express();
const feed = require("./routes/feed");
const userProfile = require("./routes/userProfile");
const userauth = require("./routes/auth.js");
const googleauth = require("./routes/googleauth.js")
const dotenv = require('dotenv').config();

mongoose
  .connect("mongodb://localhost/buzz")
  .then(() => console.log("Connected to MongoDB..."))
  .catch((err) => console.error("Could not connect to MongoDB..."));

app.use(express.json());
app.use("/api/comments", comments);
app.use("/friends/:friend_Id", friendslist);
app.use("/api/feed", feed);
app.use("/api/userprofile", userProfile);
app.use("/", userauth);
app.use("/auth/google", googleauth);

process.on('uncaughtException', (ex) => {
  console.log("We got uncaught exception", ex);
  process.exit(1);
})

app.use((err, req, res, next) => {
  console.error(err)
  res.status(500).send('' + err)
})

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
