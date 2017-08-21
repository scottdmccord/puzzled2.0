const db = require('../lib/dbConnect.js');

function getScores(req, res, next) {
  console.log("Paramas: ", req.params.id, req.params.difficulty)
  db.any(`SELECT
            scores.score AS score,
            scores.clock AS clock,
            users.username AS username
            FROM scores
            LEFT JOIN users
              ON (scores.user_id = users.id)
          WHERE puzzle_id = $1 AND difficulty = $2
          ORDER BY score ASC
          LIMIT 3`, [req.params.id, req.params.difficulty])
    .then((scores) => {
      res.rows = scores;
      console.log(res.rows);
      next();
    })
    .catch(err => console.log(err));
}

function submitScore(req, res, next) {
  db.none(`INSERT INTO scores (score, clock, user_id, puzzle_id, difficulty) VALUES ($1, $2, $3, $4, $5)`,
    [req.body.score, req.body.clock, req.body.userID, req.body.puzzleID, req.body.difficulty])
    .then(next())
    .catch(err => next(err));
}

module.exports = {
  getScores,
  submitScore
}
