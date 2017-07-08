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

function authenticateUser(req, res, next) {
  console.log('logging in user');
  db.one(`SELECT * FROM users WHERE username = $1`, req.body.username)
    .then((data) => {
      const match = bcrypt.compareSync(req.body.password, data.password);
      if (match) {
        const userID = data.id;
        const username = data.username;
        const myToken = jwt.sign({ username: req.body.username }, process.env.SECRET);
        res.status(200).json({ token: myToken, id: userID, username: username });
        console.log('successful sign in');
      } else {
        // res.status(500).send('wrong password');
        res.status(500).json({message: "Incorrect username or password"})
        console.log('wrong username or password!');
      }
    })
    .catch(error => console.log(error));
}

module.exports = {
  createUser,
  authenticateUser
};
