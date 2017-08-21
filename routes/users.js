const express = require('express');
const { createUser, authenticateUser } = require('../models/users.js');
const userRouter = express.Router();

const sendJSONresp = (req, res) => res.json(res.rows);

const showSuccessfulCreateUser = (req, res, next) => {
  res.json({message: "successfully created user"});
}


userRouter.post('/', createUser, showSuccessfulCreateUser, (err, req, res, next) => {
  res.status(400).send('Username already taken');
});

userRouter.post('/login', authenticateUser, (err, req, res, next) => {
  res.status(400).send('Incorrect username and/or password');
  res.json({message: "successfully signed in"});
});

userRouter.use((err, req, res, next) => {
  res.send(401);
})

module.exports = userRouter;
