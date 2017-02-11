const db = require('../lib/dbConnect.js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const salt = 10;

function createUser(req, res, next) {
  console.log('creating new user');
  db.none(`INSERT INTO users (username, password, email) VALUES ($1, $2, $3)`,
    [req.body.username, bcrypt.hashSync(req.body.password, salt), req.body.email])
  .then(next())
  .catch(error => next(error));
}

module.exports = {
  createUser
};
