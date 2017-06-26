const db = require('../lib/dbConnect.js');

function getScores(req, res, next) {
  db.any(`SELECT score FROM scores
          WHERE puzzle_id = $1`, req.params.id)
    .then((scores) => {
      console.log(scores);
      res.rows = scores;
      next();
    })
    .catch(err => console.log(err));
}

// function submitScores(req, res, next) {
//   db.none(`INSERT INTO scores ()`)
// }

module.exports = {
  getScores
}
