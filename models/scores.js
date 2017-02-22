const db = require('../lib/dbConnect.js');

function getHighScores(req, res, next) {
  db.any(`
    SELECT
      scores.clock as time,
      users.username as username
      puzzles.id as puzzle
    FROM scores
    INNER JOIN users
      ON (scores.user_id = users.id)
    INNER JOIN puzzles
      ON (scores.puzzle_id = puzzles.id)
    WHERE scores.puzzle_id = $1
    AND scores.puzzle_difficulty = $2`, req.params.puzzle_id, req.params.user_id)
    .then((data) => {
      res.rows = data;
      next();
    })
    .catch(err => console.log(err));
}


function submitScore(req, res, next) {

}

module.exports = {
  getHighScores, submitScore
}
