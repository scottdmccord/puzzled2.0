'use strict'
const isDev = !('NODE_ENV' in process.env) && require('dotenv').config() && true;

const express = require('express');
const bodyParser = require('body-parser');
const logger = require('morgan');
const path = require('path');
const puzzleRouter = require('./routes/puzzles');

const app = express();
const PORT = process.argv[2] || process.env.PORT || 3000;

app.use(logger('dev'));

app.use(express.static(path.join(__dirname, 'dist')));

app.use(bodyParser.json());

app.use('/puzzles', puzzleRouter);

app.listen(PORT, () => console.log('Server is here and listening on ', PORT));
