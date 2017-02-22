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
      win: true
    }

    this.baseState = this.state;
    this.loadPuzzle = this.loadPuzzle.bind(this);
    this.createPuzzle = this.createPuzzle.bind(this);
    this.generatePieces = this.generatePieces.bind(this);
    this.shuffleArray = this.shuffleArray.bind(this);
    this.scramblePuzzle = this.scramblePuzzle.bind(this);
    this.assignTiles = this.assignTiles.bind(this);
    this.swapTiles = this.swapTiles.bind(this);
    this.checkWin = this.checkWin.bind(this);
    this.moveTileFunctions = this.moveTileFunctions.bind(this);
    this.newPuzzle = this.newPuzzle.bind(this);
    this.startTImer = this.startTimer.bind(this);
    this.tickTimer = this.tickTimer.bind(this);
    this.assignScores = this.assignScores.bind(this);
    this.updateScores = this.updateScores.bind(this);
    this.refreshScores = this.refreshScores.bind(this);
    this.scoreComparison = this.scoreComparison.bind(this);

  }

  // Set the puzzle's state to easy, define the grid of puzzle pieces
  // and load the puzzle from the database.
  createPuzzle(event){
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

  // Fetches the puzzle from the psql database and saves the information in state.
  loadPuzzle(difficulty){
    console.log('the selected difficulty is ' + difficulty)
    let board = document.querySelector('.board');
    let selectionModal = document.querySelector('.selection-modal');
    fetch(`/puzzles`)
      .then(r => r.json())
      .then((data) => {
        let randomNumber = Math.floor(Math.random() * (data.length + 1));
        let highscore1 = eval('data[randomNumber].highscore_' + difficulty + '1');
        let highscore2 = eval('data[randomNumber].highscore_' + difficulty + '2');
        let highscore3 = eval('data[randomNumber].highscore_' + difficulty + '3');
        let highscore1user = eval('data[randomNumber].highscore_' + difficulty + '1' + '_user');
        let highscore2user = eval('data[randomNumber].highscore_' + difficulty + '2' + '_user');
        let highscore3user = eval('data[randomNumber].highscore_' + difficulty + '3' + '_user');
        let highscore1score = eval('data[randomNumber].highscore_' + difficulty + '1' + '_score');
        let highscore2score = eval('data[randomNumber].highscore_' + difficulty + '2' + '_score');
        let highscore3score = eval('data[randomNumber].highscore_' + difficulty + '3' + '_score');
        // let highscore1 = data[randomNumber].highscore_easy1;
        this.setState({

          puzzleID: data[randomNumber].id,
          puzzleName: data[randomNumber].name,
          puzzleURL: data[randomNumber].url,
          highscore1: highscore1,
          highscore2: highscore2,
          highscore3: highscore3,
          highscore1_user: highscore1user,
          highscore2_user: highscore2user,
          highscore3_user: highscore3user,
          highscore1_score: highscore1score,
          highscore2_score: highscore2score,
          highscore3_score: highscore3score
        });
        console.log(this.state.highscore1);
        selectionModal.style.display = 'none';
        this.generatePieces();
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
      this.assignScores();
    }
  }

  assignScores() {
    this.refreshScores(this.state.puzzleID);
    console.log("checking scores!");
    console.log(this.state.score, ' is the score');
    console.log('this is the original highscore: ', this.state.highscore1_score);
    this.scoreComparison();
    this.updateScores(this.state.puzzleID);
  }

  scoreComparison() {
    if(this.state.score < this.state.highscore1_score) {
      this.setState({
        highscore3: this.state.highscore2,
        highscore2: this.state.highscore1,
        highscore1: this.state.scoreFormatted,
        highscore3_score: this.state.highscore2_score,
        highscore2_score: this.state.highscore1_score,
        highscore1_score: this.state.score,
        highscore3_user: this.state.highscore2_user,
        highscore2_user: this.state.highscore1_user,
        highscore1_user: this.props.username
      })
    } else if(this.state.score < this.state.highscore2_score) {
      this.setState({
        highscore3: this.state.highscore2,
        highscore2: this.state.scoreFormatted,
        highscore3_score: this.state.highscore2_score,
        highscore2_score: this.state.score,
        highscore3_user: this.state.highscore2_user,
        highscore2_user: this.props.username
      })
    } else if(this.state.score < this.state.highscore3_score) {
      this.setState({
        highscore3: this.state.scoreFormatted,
        highscore3_score: this.state.score,
        highscore3_user: this.props.username
      })
    } else {
      console.log("nothing");
    }
  }


  refreshScores(id) {
    console.log('id: ', id);
    fetch(`/puzzles/${id}`)
      .then(r => r.json())
      .then((data) => {
        let difficulty = this.state.difficulty;
        let lowercaseDifficulty = difficulty.toLowerCase();
        let highscore1 = eval('data[0].highscore_' + lowercaseDifficulty + '1');
        let highscore2 = eval('data[0].highscore_' + lowercaseDifficulty + '2');
        let highscore3 = eval('data[0].highscore_' + lowercaseDifficulty + '3');
        let highscore1user = eval('data[0].highscore_' + lowercaseDifficulty + '1' + '_user');
        let highscore2user = eval('data[0].highscore_' + lowercaseDifficulty + '2' + '_user');
        let highscore3user = eval('data[0].highscore_' + lowercaseDifficulty + '3' + '_user');
        let highscore1score = eval('data[0].highscore_' + lowercaseDifficulty + '1' + '_score');
        let highscore2score = eval('data[0].highscore_' + lowercaseDifficulty + '2' + '_score');
        let highscore3score = eval('data[0].highscore_' + lowercaseDifficulty + '3' + '_score');
        console.log(highscore1);
        this.setState({
          puzzleID: data[0].id,
          puzzleName: data[0].name,
          puzzleURL: data[0].url,
          highscore1: highscore1,
          highscore2: highscore2,
          highscore3: highscore3,
          highscore1_user: highscore1user,
          highscore2_user: highscore2user,
          highscore3_user: highscore3user,
          highscore1_score: highscore1score,
          highscore2_score: highscore2score,
          highscore3_score: highscore3score
        });
      })
      .catch(err => console.log(err));
  }

  updateScores(id) {
    console.log('updating scores');
    fetch(`/puzzles/${id}`, {
      headers: {
        'Content-Type': 'application/json; charset=UTF-8'
      },
      method: 'PUT',
      body: JSON.stringify({
        highscore1: this.state.highscore1,
        highscore2: this.state.highscore2,
        highscore3: this.state.highscore3,
        highscore1_score: this.state.highscore1_score,
        highscore2_score: this.state.highscore2_score,
        highscore3_score: this.state.highscore3_score,
        highscore1_user: this.state.highscore1_user,
        highscore2_user: this.state.highscore2_user,
        highscore3_user: this.state.highscore3_user
      })
    })
  }

  newPuzzle() {
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
          highscore1={this.state.highscore1}
          highscore1_user={this.state.highscore1_user}
          highscore2={this.state.highscore2}
          highscore2_user={this.state.highscore2_user}
          highscore3={this.state.highscore3}
          highscore3_user={this.state.highscore3_user}
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
