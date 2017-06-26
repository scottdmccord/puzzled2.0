const express = require('express');
const { getScores, submitScore } = require('../models/scores');
const scoresRouter = express.Router();

const sendJSONresp = (req, res) => res.json(res.rows || []);

// scoresRouter.post('/', submitScore, (req, res) => res.json({message: "score submitted"}));
scoresRouter.get('/:id', getScores, sendJSONresp);


module.exports = scoresRouter;
