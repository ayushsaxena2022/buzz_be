const mongoose = require('mongoose');
const express = require('express');
const router = require('express').Router();
const Feed = require('./models/myfeed');
const commentSchema = require('./models/commentSchema');
const app = express();


mongoose.connect('mongodb://localhost/Buzzz_App')
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...'));

app.use(express.json());
app.use('/api/comments', require("./routes/comments"));

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`listening on port ${port}...`));
