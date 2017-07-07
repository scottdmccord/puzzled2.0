import React, { Component } from 'react';
import { Link } from 'react-router';
import style from './GamePage.css';
import InfoPanel from '../InfoPanel/InfoPanel.jsx';
import Board from '../Board/Board.jsx';

class GamePage extends Component {

  constructor(){
    super();

    this.state = {
      puzzleName: '',
      puzzleNumber: '',
      puzzleURL: 'undefined',
      difficulty: '',
      puzzleDimensions: {
        easyXAxis: 2,
        easyYAxis: 3,
        easyHeight: 169,
        easyWidth: 451,
        mediumXAxis: 4,
        mediumYAxis: 6,
        mediumHeight: 84.5,
        mediumWidth: 225.5,
        hardXAxis: 8,
        hardYAxis: 6,
        hardHeight: 84.5,
        hardWidth: 112.75,
        expertXAxis: 16,
        expertYAxis: 10,
        expertHeight: 50.7,
        expertWidth: 56.375
      },
      timer: null,
      millisecondsTENS: 0,
      millisecondsHUNDREDS: 0,
      secondsONES: 0,
      secondsTENS: 0,
      minutesONES: 0,
      minutesTENS: 0,
      hoursONES: 0,
      hoursTENS: 0,
      puzzleGrid: [],
      shuffled: false,
      turn: 0,
      divA: null,
      divB: null,
      divAID: null,
      divBID: null,
      win: true,
      scores: [{
        clock: '',
        username: '',
        score: ''
      },
      {
        clock: '',
        username: '',
        score: ''
      },
      {
        clock: '',
        username: '',
        score: ''
      }]
    }

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
  }

  // Set the puzzle's difficulty, define the grid of puzzle pieces
  // and load the puzzle from the database.
  createPuzzle(event){
    let startButton = document.getElementById('start-button');
    startButton.disabled = false;
    let buttonContainer = document.querySelectorAll('.board-button-container')[0];
    buttonContainer.style.display = "inline-block";
    console.log(buttonContainer)
    let difficultySelected = event.target.innerHTML;
    this.setState({ difficulty: difficultySelected });
    let lowercaseDifficulty = difficultySelected.toLowerCase();
    let width = 'this.state.puzzleDimensions.' + lowercaseDifficulty + 'Width';
    let height = 'this.state.puzzleDimensions.' + lowercaseDifficulty + 'Height';
    let xAxis = eval('this.state.puzzleDimensions.' + lowercaseDifficulty + 'XAxis');
    let yAxis = eval('this.state.puzzleDimensions.' + lowercaseDifficulty + 'YAxis');
    for(var i = 0; i < xAxis; i++) {
      this.state.puzzleGrid[i] = [];
      for(var j = 0; j < yAxis; j++) {
        this.state.puzzleGrid[i][j] = { x: (i * -eval(width)), y: (j * -eval(height))};
      }
    }
    this.loadPuzzle(lowercaseDifficulty);
  };

  // Fetches puzzles from the psql database, select a random one, and saves its information in state.
  loadPuzzle(difficulty){
    console.log('the selected difficulty is ' + difficulty)
    let board = document.querySelector('.board');
    let selectionModal = document.querySelector('.selection-modal');
    fetch(`/puzzles`)
      .then(r => r.json())
      .then((data) => {
        let randomNumber = Math.floor(Math.random() * (data.length));
        this.loadScores(randomNumber + 1, difficulty);
        this.setState({
          puzzleID: data[randomNumber].id,
          puzzleName: data[randomNumber].name,
          puzzleURL: data[randomNumber].url,
        });
        selectionModal.style.display = 'none';
        this.generatePieces();
      })
      .catch(err => console.log(err));
  }

  // load the high scores
  loadScores(puzzleId, difficulty) {
    console.log("Puzzle ID is: ", puzzleId);
    console.log("Difficulty is: ", difficulty)
    fetch(`/scores/${puzzleId}/${difficulty}`)
      .then(r => r.json())
      .then((data) => {
        console.log(data);
        this.setState({
          scores: data
        });
      })
      .catch(err => console.log(err));
  }

  // Separates the puzzle image into 6 separate divs.
  generatePieces(){
    let board = document.querySelector('.board');
    let counter = 0;
    let grid = this.state.puzzleGrid;
    let image = this.state.puzzleURL;
    let difficultySelected = this.state.difficulty;
    let lowercaseDifficulty = difficultySelected.toLowerCase();
    let width = eval('this.state.puzzleDimensions.' + lowercaseDifficulty + 'Width');
    let height = eval('this.state.puzzleDimensions.' + lowercaseDifficulty + 'Height');

    for(let a = 0; a < grid.length; a++) {
      for(let b = 0; b < grid[a].length; b++) {
        let block = document.createElement("div");
        block.className = 'piece';
        block.id = 'piece' + counter;
        block.style.backgroundImage = image;
        block.style.backgroundPosition = grid[a][b].x + 'px ' + grid[a][b].y + 'px';
        block.style.height = height + 'px';
        block.style.width = width + 'px';
        board.appendChild(block);
        counter++;
      }
    }
  }

  // references stack overflow: http://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
  shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = array[i];
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
    let startButton = document.getElementById('start-button');
    startButton.disabled = true;
    if(!this.state.shuffled) {
      this.setState({ shuffled: true });
      let board = document.querySelector('.board');
      board.addEventListener('click', this.moveTileFunctions);
      let puzzlePieces = document.querySelectorAll('.piece');
      for(let i = 0; i < puzzlePieces.length; i++) {
        puzzlePieces.className = 'clickPiece';
        let target = Math.floor(Math.random() * puzzlePieces.length - 1) + 1;
        let target2 = Math.floor(Math.random() * puzzlePieces.length - 1) + 1;
        board.insertBefore(puzzlePieces[target], puzzlePieces[target2]);
      }
    }
    this.startTimer();
  }

  assignTiles(event) {
    let turn = this.state.turn;
    let divA = this.state.divA;
    let divB = this.state.divB;
    let divAID = this.state.divAID;
    let divBID = this.state.divBID;

    if(turn === 0) {
      console.log('turn 0');
      this.setState({
        divA: event.target.style.backgroundPosition,
        divAID: event.target.id
      })
      this.setState({ turn: 1 })
      console.log(turn);
    } else {
      console.log('turn 1');
      let divBBP = event.target.style.backgroundPosition;
      this.setState({
        divB: divBBP,
        divBID: event.target.id
       })
      this.setState({ turn: 2 });
    }
  }

  swapTiles() {
    if(this.state.turn === 2) {
      let divA = document.getElementById(this.state.divAID);
      let divB = document.getElementById(this.state.divBID);
      divA.style.backgroundPosition = this.state.divB;
      divB.style.backgroundPosition = this.state.divA;
      divA.id = this.state.divBID;
      divB.id = this.state.divAID;
      this.setState({ turn: 0 });
    } else {
      console.log("no swap");
    }
  }

  checkWin() {
    let pieces = document.querySelectorAll('.piece');
    this.setState({win: true});
    for(let i = 0; i < pieces.length; i++) {
      if(pieces[i].id != ('piece' + i)) {
        this.setState({win: false});
        console.log("No win");
      }
    }
    if(this.state.win === true) {
      console.log("win");
      setTimeout(() => {
        clearInterval(this.state.timer);
        alert('You win! Click "New Puzzle" to try again.');
      }, 250);
      let score = parseInt(this.state.hoursTENS.toString() + this.state.hoursONES.toString() + this.state.minutesTENS.toString() + this.state.minutesONES.toString() + this.state.secondsTENS.toString() + this.state.secondsONES.toString() + this.state.millisecondsHUNDREDS.toString() + this.state.millisecondsTENS.toString());
      let scoreFormatted = this.state.hoursTENS.toString() + this.state.hoursONES.toString() + ':' + this.state.minutesTENS.toString() + this.state.minutesONES.toString() + ':' + this.state.secondsTENS.toString() + this.state.secondsONES.toString() + ':' + this.state.millisecondsHUNDREDS.toString() + this.state.millisecondsTENS.toString();
      console.log(score);
      console.log(scoreFormatted);
      this.setState({score: score, scoreFormatted: scoreFormatted})
      let board = document.querySelector('.board');
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
      body: JSON.stringify({
        score: this.state.score,
        clock: this.state.scoreFormatted,
        puzzleID: this.state.puzzleID,
        userID: this.props.userID,
        username: this.props.username,
        difficulty: (this.state.difficulty).toLowerCase()
      })
    })
      .then(() => {
        this.loadScores(this.state.puzzleID, (this.state.difficulty).toLowerCase());
      })
      .catch(err => console.log(err));
  }

  assignScores() {
    this.refreshScores(this.state.puzzleID);
    console.log("checking scores!");
    console.log(this.state.score, ' is the score');
    console.log('this is the original highscore: ', this.state.highscore1_score);
    this.scoreComparison();
    this.updateScores(this.state.puzzleID);
  }

  newPuzzle() {
    let buttonContainer = document.querySelectorAll('.board-button-container')[0];
    buttonContainer.style.display = "none";
    console.log('new puzzle!');
    let selectionModal = document.querySelector('.selection-modal');
    selectionModal.style.display = 'flex';
    this.setState(this.baseState);
    this.setState({ puzzleGrid: [] });
    let board = document.querySelector('.board');
    board.innerHTML = '';
    clearInterval(this.state.timer);
  }

  startTimer() {
    console.log('starting timer');
    this.setState({ timer: setInterval(this.tickTimer, 10) })
  }

  tickTimer() {
    this.setState({millisecondsTENS: this.state.millisecondsTENS + 1})

    if(this.state.millisecondsTENS > 9) {
      this.setState({
        millisecondsTENS: 0,
        millisecondsHUNDREDS: this.state.millisecondsHUNDREDS + 1
      })
    }

    if(this.state.millisecondsHUNDREDS > 9) {
      this.setState({
        millisecondsHUNDREDS: 0,
        secondsONES: this.state.secondsONES + 1
      })
    }

    if(this.state.secondsONES > 9) {
      this.setState({
        secondsONES: 0,
        secondsTENS: this.state.secondsTENS + 1
      })
    }

    if(this.state.secondsTENS > 5) {
      this.setState({
        secondsTENS: 0,
        minutesONES: this.state.minutesONES + 1
      })
    }

    if(this.state.minutesONES > 9) {
      this.setState({
        minutesONES: 0,
        minutesTENS: this.state.minutesTENS + 1
      })
    }

    if(this.state.minutesTENS > 5) {
      this.setState({
        minutesTENS: 0,
        hoursONES: this.state.hoursONES + 1
      })
    }

    if(this.state.hoursONES > 9) {
      this.setState({
        hoursONES: 0,
        hoursTENS: this.state.hoursTENS + 1
      })
    }

  }

  render(){
    return(
      <div className="gamepage-container">

      <div className="gamepage-view">
        <h1> Game Page </h1>
        <h2> Welcome, {this.props.username}!</h2>
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
          highscore1={this.state.scores[0]['clock']}
          highscore1_user={this.state.scores[0]['username']}
          highscore2={this.state.scores[1]['clock']}
          highscore2_user={this.state.scores[1]['username']}
          highscore3={this.state.scores[2]['clock']}
          highscore3_user={this.state.scores[2]['username']}
        />
        <Board
          scramblePuzzle={this.scramblePuzzle}
          newPuzzle={this.newPuzzle}
        />
      </div>

      <div className="selection-modal">
        <button onClick={this.createPuzzle}>Easy</button>
        <button onClick={this.createPuzzle}>Medium</button>
        <button onClick={this.createPuzzle}>Hard</button>
        <button onClick={this.createPuzzle}>Expert</button>
      </div>

      </div>
    )
  }
}

export default GamePage;
