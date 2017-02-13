'use strict'
const isDev = !('NODE_ENV' in process.env) && require('dotenv').config() && true;

const express = require('express');
const bodyParser = require('body-parser');
const logger = require('morgan');
const path = require('path');
const puzzleRouter = require('./routes/puzzles');
const userRouter = require('./routes/users');

const app = express();
const PORT = process.argv[2] || process.env.PORT || 3000;

app.use(logger('dev'));

app.use(express.static(path.join(__dirname, 'dist')));

app.use(bodyParser.json());

app.use('/puzzles', puzzleRouter);
app.use('/users', userRouter);

app.get('*', function (request, response){
  response.sendFile(path.resolve(__dirname, 'dist', 'index.html'))
})

app.listen(PORT, () => console.log('Server is here and listening on ', PORT));
