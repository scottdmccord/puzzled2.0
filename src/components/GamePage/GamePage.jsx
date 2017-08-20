/* eslint-env browser, node */

import React, { Component } from 'react';
import { Link } from 'react-router';
import style from './GamePage.css';
import InfoPanel from '../InfoPanel/InfoPanel.jsx';
import Board from '../Board/Board.jsx';

class GamePage extends Component {

  constructor() {
    super();

    this.state = {
      puzzleName:       '',
      puzzleNumber:     '',
      puzzleURL:        'undefined',
      difficulty:       '',
      puzzleDimensions: {
        easyXAxis:    2,
        easyYAxis:    3,
        easyHeight:   169,
        easyWidth:    451,
        mediumXAxis:  4,
        mediumYAxis:  6,
        mediumHeight: 84.5,
        mediumWidth:  225.5,
        hardXAxis:    8,
        hardYAxis:    6,
        hardHeight:   84.5,
        hardWidth:    112.75,
        expertXAxis:  16,
        expertYAxis:  10,
        expertHeight: 50.7,
        expertWidth:  56.375,
      },
      timer:                null,
      millisecondsTENS:     0,
      millisecondsHUNDREDS: 0,
      secondsONES:          0,
      secondsTENS:          0,
      minutesONES:          0,
      minutesTENS:          0,
      hoursONES:            0,
      hoursTENS:            0,
      puzzleGrid:           [],
      shuffled:             false,
      turn:                 0,
      divA:                 null,
      divB:                 null,
      divAID:               null,
      divBID:               null,
      win:                  true,
      scores:               [{
        clock:    '',
        username: '',
        score:    '',
      },
      {
        clock:    '',
        username: '',
        score:    '',
      },
      {
        clock:    '',
        username: '',
        score:    '',
      }],
    };

    this.baseState = this.state;
    this.loadPuzzle = this.loadPuzzle.bind(this);
    this.createPuzzle = this.createPuzzle.bind(this);
    this.loadScores = this.loadScores.bind(this);
    this.generatePieces = this.generatePieces.bind(this);
    this.shuffleArray = this.shuffleArray.bind(this);
    this.scramblePuzzle = this.scramblePuzzle.bind(this);
    this.assignTiles = this.assignTiles.bind(this);
    this.swapTiles = this.swapTiles.bind(this);
    this.checkWin = this.checkWin.bind(this);
    this.moveTileFunctions = this.moveTileFunctions.bind(this);
    this.newPuzzle = this.newPuzzle.bind(this);
    this.startTimer = this.startTimer.bind(this);
    this.tickTimer = this.tickTimer.bind(this);
    this.submitScore = this.submitScore.bind(this);
    this.winClose = this.winClose.bind(this);
  }

  // Set the puzzle's difficulty, define the grid of puzzle pieces
  // and load the puzzle from the database.
  createPuzzle(event) {
    const startButton = document.getElementById('start-button');
    startButton.disabled = false;
    const buttonContainer = document.querySelectorAll('.board-button-container')[0];
    buttonContainer.style.display = 'inline-flex';
    const difficultySelected = event.target.innerHTML;
    this.setState({ difficulty: difficultySelected });
    const lowercaseDifficulty = difficultySelected.toLowerCase();
    const width = `this.state.puzzleDimensions.${lowercaseDifficulty}Width`;
    const height = `this.state.puzzleDimensions.${lowercaseDifficulty}Height`;
    const xAxis = eval(`this.state.puzzleDimensions.${lowercaseDifficulty}XAxis`);
    const yAxis = eval(`this.state.puzzleDimensions.${lowercaseDifficulty}YAxis`);
    for (var i = 0; i < xAxis; i++) {
      this.state.puzzleGrid[i] = [];
      for (var j = 0; j < yAxis; j++) {
        this.state.puzzleGrid[i][j] = { x: (i * -eval(width)), y: (j * -eval(height)) };
      }
    }
    this.loadPuzzle(lowercaseDifficulty);
  }

  // Fetches puzzles from the psql database, select a random one, and saves its information in state.
  loadPuzzle(difficulty) {
    const board = document.querySelector('.board');
    const selectionModal = document.querySelector('.selection-modal');
    fetch('/puzzles')
      .then(r => r.json())
      .then((data) => {
        const randomNumber = Math.floor(Math.random() * (data.length));
        this.loadScores(randomNumber + 1, difficulty);
        this.setState({
          puzzleID:   data[randomNumber].id,
          puzzleName: data[randomNumber].name,
          puzzleURL:  data[randomNumber].url,
        });
        selectionModal.style.display = 'none';
        this.generatePieces();
        const infoPanel = document.getElementById('info-panel-content');
        infoPanel.style.display = 'inline-block';
      })
      .catch(err => console.log(err));
  }

  // load the high scores
  loadScores(puzzleId, difficulty) {
    fetch(`/scores/${puzzleId}/${difficulty}`)
      .then(r => r.json())
      .then((data) => {
        this.setState({
          scores: data,
        });
      })
      .catch(err => console.log(err));
  }

  // Separates the puzzle image into 6 separate divs.
  generatePieces() {
    const board = document.querySelector('.board');
    let counter = 0;
    const grid = this.state.puzzleGrid;
    const image = this.state.puzzleURL;
    const difficultySelected = this.state.difficulty;
    const lowercaseDifficulty = difficultySelected.toLowerCase();
    const width = this.state.puzzleDimensions[`${lowercaseDifficulty}Width`];
    const height = this.state.puzzleDimensions[`${lowercaseDifficulty}Height`];

    for (let a = 0; a < grid.length; a += 1) {
      for (let b = 0; b < grid[a].length; b += 1) {
        const block = document.createElement('div');
        block.className = 'piece';
        block.id = `piece${counter}`;
        block.style.backgroundImage = image;
        block.style.backgroundPosition = `${grid[a][b].x}px ${grid[a][b].y}px`;
        block.style.height = `${height}px`;
        block.style.width = `${width}px`;
        board.appendChild(block);
        counter += 1;
      }
    }
  }

  // references stack overflow: http://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
  shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
    return array;
  }

  moveTileFunctions() {
    this.assignTiles(event);
    this.swapTiles();
    this.checkWin();
  }


  scramblePuzzle() {
    const startButton = document.getElementById('start-button');
    startButton.disabled = true;
    if (!this.state.shuffled) {
      this.setState({ shuffled: true });
      const board = document.querySelector('.board');
      board.addEventListener('click', this.moveTileFunctions);
      const puzzlePieces = document.querySelectorAll('.piece');
      for (let i = 0; i < puzzlePieces.length; i++) {
        puzzlePieces.className = 'clickPiece';
        puzzlePieces[i].style.outline = 'solid white 1px';
        const target = Math.floor(Math.random() * puzzlePieces.length - 1) + 1;
        const target2 = Math.floor(Math.random() * puzzlePieces.length - 1) + 1;
        board.insertBefore(puzzlePieces[target], puzzlePieces[target2]);
      }
    }
    this.startTimer();
  }

  assignTiles(event) {
    const turn = this.state.turn;
    const divA = this.state.divA;
    const divB = this.state.divB;
    const divAID = this.state.divAID;
    const divBID = this.state.divBID;

    if (turn === 0) {
      this.setState({
        divA:   event.target.style.backgroundPosition,
        divAID: event.target.id,
      });
      this.setState({ turn: 1 });
    } else {
      const divBBP = event.target.style.backgroundPosition;
      this.setState({
        divB:   divBBP,
        divBID: event.target.id,
      });
      this.setState({ turn: 2 });
    }
  }

  swapTiles() {
    if (this.state.turn === 2) {
      const divA = document.getElementById(this.state.divAID);
      const divB = document.getElementById(this.state.divBID);
      divA.style.backgroundPosition = this.state.divB;
      divB.style.backgroundPosition = this.state.divA;
      divA.id = this.state.divBID;
      divB.id = this.state.divAID;
      this.setState({ turn: 0 });
    } else {
    }
  }

  checkWin() {
    const pieces = document.querySelectorAll('.piece');
    this.setState({ win: true });
    for (let i = 0; i < pieces.length; i++) {
      if (pieces[i].id != (`piece${i}`)) {
        this.setState({ win: false });
      }
    }
    if (this.state.win === true) {
      document.getElementById('win-box').style.display = 'flex';
      setTimeout(() => {
        clearInterval(this.state.timer);
      }, 250);

      pieces.forEach(piece => {
        piece.style.outline = 'none';
      });

      const score = parseInt(this.state.hoursTENS.toString() + this.state.hoursONES.toString() + this.state.minutesTENS.toString() + this.state.minutesONES.toString() + this.state.secondsTENS.toString() + this.state.secondsONES.toString() + this.state.millisecondsHUNDREDS.toString() + this.state.millisecondsTENS.toString());
      const scoreFormatted = `${this.state.hoursTENS.toString() + this.state.hoursONES.toString()}:${this.state.minutesTENS.toString()}${this.state.minutesONES.toString()}:${this.state.secondsTENS.toString()}${this.state.secondsONES.toString()}:${this.state.millisecondsHUNDREDS.toString()}${this.state.millisecondsTENS.toString()}`;
      this.setState({ score, scoreFormatted });
      const board = document.querySelector('.board');
      board.removeEventListener('click', this.moveTileFunctions);
      this.submitScore();

    }
  }


  // Submit individual score to the database after each puzzle is successfully completed
  submitScore() {
    fetch('/scores', {
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
      method: 'POST',
      body:   JSON.stringify({
        score:      this.state.score,
        clock:      this.state.scoreFormatted,
        puzzleID:   this.state.puzzleID,
        userID:     this.props.userID,
        username:   this.props.username,
        difficulty: (this.state.difficulty).toLowerCase(),
      }),
    })
      .then(() => {
        this.loadScores(this.state.puzzleID, (this.state.difficulty).toLowerCase());
      })
      .catch(err => console.log(err));
  }

  assignScores() {
    this.refreshScores(this.state.puzzleID);
    this.scoreComparison();
    this.updateScores(this.state.puzzleID);
  }

  newPuzzle() {
    const buttonContainer = document.querySelectorAll('.board-button-container')[0];
    buttonContainer.style.display = 'none';
    const selectionModal = document.querySelector('.selection-modal');
    selectionModal.style.display = 'flex';
    this.setState(this.baseState);
    this.setState({ puzzleGrid: [] });
    const board = document.querySelector('.board');
    board.innerHTML = '';
    clearInterval(this.state.timer);
    const infoPanel = document.getElementById('info-panel-content');
    infoPanel.style.display = 'none';
  }

  startTimer() {
    this.setState({ timer: setInterval(this.tickTimer, 10) });
  }

  tickTimer() {
    this.setState({ millisecondsTENS: this.state.millisecondsTENS + 1 });

    if (this.state.millisecondsTENS > 9) {
      this.setState({
        millisecondsTENS:     0,
        millisecondsHUNDREDS: this.state.millisecondsHUNDREDS + 1,
      });
    }

    if (this.state.millisecondsHUNDREDS > 9) {
      this.setState({
        millisecondsHUNDREDS: 0,
        secondsONES:          this.state.secondsONES + 1,
      });
    }

    if (this.state.secondsONES > 9) {
      this.setState({
        secondsONES: 0,
        secondsTENS: this.state.secondsTENS + 1,
      });
    }

    if (this.state.secondsTENS > 5) {
      this.setState({
        secondsTENS: 0,
        minutesONES: this.state.minutesONES + 1,
      });
    }

    if (this.state.minutesONES > 9) {
      this.setState({
        minutesONES: 0,
        minutesTENS: this.state.minutesTENS + 1,
      });
    }

    if (this.state.minutesTENS > 5) {
      this.setState({
        minutesTENS: 0,
        hoursONES:   this.state.hoursONES + 1,
      });
    }

    if (this.state.hoursONES > 9) {
      this.setState({
        hoursONES: 0,
        hoursTENS: this.state.hoursTENS + 1,
      });
    }
  }

  winClose() {
    document.getElementById('win-box').style.display = 'none';
  }

  render() {
    return (
      <div className="gamepage-container">
        <h2 id="welcome-text"> Welcome, {this.props.username}!</h2>

        <div id="board-holder">
          <InfoPanel
            millisecondsONES={this.state.millisecondsONES}
            millisecondsTENS={this.state.millisecondsTENS}
            millisecondsHUNDREDS={this.state.millisecondsHUNDREDS}
            secondsONES={this.state.secondsONES}
            secondsTENS={this.state.secondsTENS}
            minutesONES={this.state.minutesONES}
            minutesTENS={this.state.minutesTENS}
            hoursONES={this.state.hoursONES}
            hoursTENS={this.state.hoursTENS}
            highscore1={this.state.scores[0].clock}
            highscore1_user={this.state.scores[0].username}
            highscore2={this.state.scores[1].clock}
            highscore2_user={this.state.scores[1].username}
            highscore3={this.state.scores[2].clock}
            highscore3_user={this.state.scores[2].username}
          />


          <Board
            scramblePuzzle={this.scramblePuzzle}
            newPuzzle={this.newPuzzle}
          />
        </div>

        <div className="board-button-container">
          <button id="start-button" className="puzzle-button" onClick={this.scramblePuzzle}>Start</button>
          <button className="puzzle-button" onClick={this.newPuzzle}>New Puzzle</button>
        </div>


        <div className="selection-modal">
          <h2>Select your difficulty...</h2>
          <div id="difficulty-selection">
            <button className="difficulty-button" onClick={this.createPuzzle}>Easy</button>
            <button className="difficulty-button" onClick={this.createPuzzle}>Medium</button>
            <button className="difficulty-button" onClick={this.createPuzzle}>Hard</button>
            <button className="difficulty-button" onClick={this.createPuzzle}>Expert</button>
          </div>
        </div>

        <div id='win-box'><p>Congratulations, you're a jigsaw master!</p><div id='win-close' onClick={this.winClose}>Close</div></div>
      </div>
    );
  }
}

export default GamePage;
