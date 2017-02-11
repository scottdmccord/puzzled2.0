const express = require('express');
const { createUser } = require('../models/users.js');
const userRouter = express.Router();

const sendJSONresp = (req, res) => res.json(res.rows);

userRouter.post('/', createUser, (req, res) => {
  res.redirect('/');
});

module.exports = userRouter;
