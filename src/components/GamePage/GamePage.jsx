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
    this.loadPuzzle();
  };

  // Fetches the puzzle from the psql database and saves the information in state.
  loadPuzzle(){
    let board = document.querySelector('.board');
    let selectionModal = document.querySelector('.selection-modal');
    fetch(`/puzzles`)
      .then(r => r.json())
      .then((data) => {
        let randomNumber = Math.floor(Math.random() * (data.length + 1));
        this.setState({
          puzzleNumber: randomNumber,
          puzzleName: data[randomNumber].name,
          puzzleURL: data[randomNumber].url
        });
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
        alert('You win! Click "New Puzzle" to try again.');
      }, 250);
      let board = document.querySelector('.board');
      board.removeEventListener('click', this.moveTileFunctions);
    }
  }

  newPuzzle() {
    console.log('new puzzle!');
    let selectionModal = document.querySelector('.selection-modal');
    selectionModal.style.display = 'flex';
    this.setState(this.baseState);
    this.setState({ puzzleGrid: [] });
    let board = document.querySelector('.board');
    board.innerHTML = '';
  }

  render(){
    return(
      <div className="gamepage-container">

      <div className="gamepage-view">
        <h1> Game Page </h1>
        <h2> Welcome, {this.props.username}!</h2>
        <InfoPanel />
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
