const express = require('express');
const app = express();

app.use(function (req, res) {

      console.log('comments posted');
      next();
 })


