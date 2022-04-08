const mongoose = require('mongoose');
const Joi = require('joi');
const comments = require('./routes/comments');
const express = require('express');
const app = express();

mongoose.connect('mongodb://localhost/Buzzz_App')
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...'));

app.use(express.json());
app.use('/api/comments', comments);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`listening on port ${port}...`));



