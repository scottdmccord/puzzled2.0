const express = require('express');
const { createUser, authenticateUser } = require('../models/users.js');
const userRouter = express.Router();

const sendJSONresp = (req, res) => res.json(res.rows);

userRouter.post('/', createUser, (req, res) => {
  res.json({message: "successfully created user"});
});

userRouter.post('/login', authenticateUser, (req, res, next) => {
  res.json({message: "successfully signed in"});
});

module.exports = userRouter;
