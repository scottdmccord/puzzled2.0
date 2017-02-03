const express = require('express');
const puzzleRouter = express.Router();
const { getPuzzle } = require('../models/puzzles');

puzzleRouter.get('/', getPuzzle, (req, res) => {
  res.json(res.rows || []);
});

module.exports = puzzleRouter;
