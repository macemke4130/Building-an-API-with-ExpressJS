const express = require('express');
const chirpsRouter = require('./chirps');

const app = express.Router();

app.use('/chirps', chirpsRouter);

module.exports = app;