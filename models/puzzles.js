const db = require('../lib/dbConnect.js');

function getPuzzle(req, res, next) {
  db.any(`SELECT * FROM puzzles`)
    .then((puzzle) => {
      res.rows = puzzle;
      next();
    })
    .catch(error => console.log(error));
}

function updatePuzzle(req, res, next) {
  console.log('updating scores');
  db.none(`UPDATE puzzles
           SET highscore_easy1 = $2, highscore_easy1_user = $3, highscore_easy1_score = $4, highscore_easy2 = $5, highscore_easy2_user = $6, highscore_easy2_score = $7, highscore_easy3 = $8, highscore_easy3_user = $9, highscore_easy3_score = $10
           WHERE id = $1
           `, [req.params.id, req.body.highscore1, req.body.highscore1_user, req.body.highscore1_score,
               req.body.highscore2, req.body.highscore2_user, req.body.highscore2_score,
               req.body.highscore3, req.body.highscore3_user, req.body.highscore3_score])
  .then(next())
  .catch(err => console.log(err));
}

function refreshScores(req, res, next) {
  console.log('refreshing scores in model');
  db.any(`SELECT * FROM puzzles WHERE id = $1`, [req.params.id])
    .then((puzzle) => {
      res.puzzle = puzzle;
      next();
    })
    .catch(err => console.log(err));
}

module.exports = {
  getPuzzle, updatePuzzle, refreshScores
}
