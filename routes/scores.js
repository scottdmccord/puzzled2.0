const express = require('express');
const { getScores } = require('../models/scores');
const scoresRouter = express.Router();

const sendJSONresp = (req, res) => res.json(res.rows || []);

scoresRouter.get('/:id', getScores, sendJSONresp);


module.exports = scoresRouter;
