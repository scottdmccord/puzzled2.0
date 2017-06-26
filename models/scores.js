const db = require('../lib/dbConnect.js');

function getScores(req, res, next) {
  db.any(`SELECT
            scores.score AS score,
            scores.clock AS clock,
            users.username AS username
            FROM scores
            LEFT JOIN users
              ON (scores.user_id = users.id)
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
