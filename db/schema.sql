DROP TABLE IF EXISTS puzzles;

CREATE TABLE puzzles (
  id SERIAL PRIMARY KEY,
  name VARCHAR NOT NULL,
  url TEXT NOT NULL,
);

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(20) NOT NULL,
  password VARCHAR NOT NULL,
  email VARCHAR NOT NULL,
  date_created TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE highscores (
  id SERIAL PRIMARY KEY,
  puzzle_id INT NOT NULL,
  highscore1 TEXT DEFAULT 'No high score',
  highscore1_user DEFAULT 'n/a',
  highscore2 TEXT DEFAULT 'No high score',
  highscore2_user DEFAULT 'n/a',
  highscore3 TEXT DEFAULT 'No high score',
  highscore3_user DEFAULT 'n/a',
);
