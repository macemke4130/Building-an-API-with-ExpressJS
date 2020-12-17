const express = require('express');
const apiRouter = require('./routes');
const path = require('path');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Points end user to our Client folder when they navigate to the root of LH:3000 --
app.use(express.static('./client'));

// Puts our api inside of an "/api" path --
app.use('/api', apiRouter);

// app.get('*', (req, res) => res.sendFile(path.join(__dirname, '../client/404.html')));

app.listen(3000, () => console.log("Server Running on http://localhost:3000/"));