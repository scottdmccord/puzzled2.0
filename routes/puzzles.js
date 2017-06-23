const express = require('express');
const puzzleRouter = express.Router();
const { getPuzzle, updatePuzzle, refreshScores } = require('../models/puzzles');

// puzzleRouter.get('/:id', refreshScores, (req, res) => {
//   res.json(res.puzzle || []);
// })

puzzleRouter.get('/', getPuzzle, (req, res) => {
  res.json(res.rows || []);
});


// puzzleRouter.put('/:id', updatePuzzle, (req, res) => {
//   res.json({ message: 'Puzzle scores updated'});
// });

module.exports = puzzleRouter;
