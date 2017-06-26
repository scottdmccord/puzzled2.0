const db = require('../lib/dbConnect.js');

function getScores(req, res, next) {
  db.any(`SELECT
            scores.score AS score,
            scores.clock AS clock,
            users.username AS username
            FROM scores
            LEFT JOIN users
              ON (scores.user_id = users.id)
          WHERE puzzle_id = $1
          ORDER BY score ASC
          LIMIT 3`, req.params.id)
    .then((scores) => {
      console.log(scores);
      res.rows = scores;
      next();
    })
    .catch(err => console.log(err));
}

function submitScore(req, res, next) {
  db.none(`INSERT INTO scores (score, clock, user_id, puzzle_id) VALUES ($1, $2, $3, $4)`,
    [req.body.score, req.body.clock, req.body.userID, req.body.puzzleID])
    .then(next())
    .catch(err => next(err));
}

module.exports = {
  getScores,
  submitScore
}
