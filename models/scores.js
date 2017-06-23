const db = require('../lib/dbConnect.js');

function getScores(req, res, next) {
  db.any(`SELECT * FROM scores
          WHERE id = $1`, req.params.id)
    .then((scores) => {
      console.log(scores);
      res.rows = scores;
      next();
    })
    .catch(err => console.log(err));
}

module.exports = {
  getScores
}
