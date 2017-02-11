const db = require('../lib/dbConnect.js');

function createUser(req, res, next) {
  console.log('creating new user');
  db.none(`INSERT INTO users (username, password, email) VALUES ($1, $2, $3)`,
    [req.body.username, req.body.password, req.body.email])
  .then(next())
  .catch(error => next(error));
}
