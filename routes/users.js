const express = require('express');
const { createUser, authenticateUser } = require('../models/users.js');
const userRouter = express.Router();

const sendJSONresp = (req, res) => res.json(res.rows);

userRouter.post('/', createUser, (req, res) => {
  res.redirect('/');
});

userRouter.post('/login', authenticateUser, (req, res, next) => {
  res.json({message: "successfully signed in"});
});

module.exports = userRouter;
