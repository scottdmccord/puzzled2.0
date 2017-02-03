DROP TABLE IF EXISTS puzzles;
DROP TABLE IF EXISTS users;

CREATE TABLE puzzles (
  id SERIAL PRIMARY KEY,
  name VARCHAR NOT NULL,
  url TEXT NOT NULL,
  highscore_easy1 TEXT DEFAULT 'No high score',
  highscore_easy1_user TEXT DEFAULT 'n/a',
  highscore_easy2 TEXT DEFAULT 'No high score',
  highscore_easy2_user TEXT DEFAULT 'n/a',
  highscore_easy3 TEXT DEFAULT 'No high score',
  highscore_easy3_user TEXT DEFAULT 'n/a',
  highscore_medium1 TEXT DEFAULT 'No high score',
  highscore_medium1_user TEXT DEFAULT 'n/a',
  highscore_medium2 TEXT DEFAULT 'No high score',
  highscore_medium2_user TEXT DEFAULT 'n/a',
  highscore_medium3 TEXT DEFAULT 'No high score',
  highscore_medium3_user TEXT DEFAULT 'n/a',
  highscore_hard1 TEXT DEFAULT 'No high score',
  highscore_hard1_user TEXT DEFAULT 'n/a',
  highscore_hard2 TEXT DEFAULT 'No high score',
  highscore_hard2_user TEXT DEFAULT 'n/a',
  highscore_hard3 TEXT DEFAULT 'No high score',
  highscore_hard3_user TEXT DEFAULT 'n/a',
  highscore_expert1 TEXT DEFAULT 'No high score',
  highscore_expert1_user TEXT DEFAULT 'n/a',
  highscore_expert2 TEXT DEFAULT 'No high score',
  highscore_expert2_user TEXT DEFAULT 'n/a',
  highscore_expert3 TEXT DEFAULT 'No high score',
  highscore_expert3_user TEXT DEFAULT 'n/a'
);

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(20) NOT NULL,
  password VARCHAR NOT NULL,
  email VARCHAR NOT NULL,
  date_created TIMESTAMP NOT NULL DEFAULT NOW()
);
