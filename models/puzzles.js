const db = require('../lib/dbConnect.js');

function getPuzzle(req, res, next) {
  db.any(`SELECT * FROM puzzles`)
    .then((puzzle) => {
      res.rows = puzzle;
      next();
    })
    .catch(error => console.log(error));
}

module.exports = {
  getPuzzle
}
