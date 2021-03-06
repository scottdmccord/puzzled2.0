DROP TABLE IF EXISTS scores;
DROP TABLE IF EXISTS puzzles;
DROP TABLE IF EXISTS users;

CREATE TABLE puzzles (
  id SERIAL PRIMARY KEY,
  name VARCHAR NOT NULL,
  url TEXT NOT NULL
);

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(20) NOT NULL UNIQUE,
  password VARCHAR NOT NULL,
  email VARCHAR NOT NULL,
  date_created TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE scores (
  id SERIAL PRIMARY KEY,
  score INT,
  clock TEXT,
  user_id INT,
  puzzle_id INT,
  difficulty TEXT,
  date_created TIMESTAMP NOT NULL DEFAULT NOW()
);

ALTER TABLE ONLY scores
  ADD CONSTRAINT scores_user_id_fkey
  FOREIGN KEY (user_id)
  REFERENCES users(id)
  ON UPDATE CASCADE
  ON DELETE CASCADE;

ALTER TABLE ONLY scores
  ADD CONSTRAINT scores_puzzle_id_fkey
  FOREIGN KEY (puzzle_id)
  REFERENCES puzzles(id)
  ON UPDATE CASCADE
  ON DELETE CASCADE;
