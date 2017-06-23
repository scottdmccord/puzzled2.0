const express = require('express');
const scoresRouter = express.Router();

const sendJSONresp = (req, res) => res.json(res.rows);

module.exports = scoresRouter;
