const express = require("express");
const app = express();
const mongoose = require("mongoose");
const feed = require("./routes/feed");
const userProfile = require("./routes/userProfile");
const userauth = require("./routes/auth.js");
const googleauth = require("./routes/googleauth.js")

mongoose
  .connect("mongodb://localhost/buzz")
  .then(() => console.log("Connected to MongoDB..."))
  .catch((err) => console.error("Could not connect to MongoDB..."));

app.use(express.json());
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


