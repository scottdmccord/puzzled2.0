import React, { Component } from 'react';
import style from './GamePage.css';
import InfoPanel from '../InfoPanel/InfoPanel.jsx';
import Board from '../Board/Board.jsx';

class GamePage extends Component {

  constructor(){
    super();

    this.state = {
      puzzleName: '',
      puzzleURL: 'undefined',
      difficulty: '',
      puzzleDimensions: {
        easyHeight: 169,
        easyWidth: 451,
        mediumHeight: 84.5,
        mediumWidth: 225.5,
        hardHeight: 84.5,
        hardWidth: 112.75,
        expertHeight: 50.7,
        expertWidth: 56.375
      },
      puzzleGrid: [],
      shuffled: false,
      turn: 0,
      divA: null,
      divB: null,
      holder: null,
      divAID: null,
      divBID: null,
      holderID: null
    }

    this.loadPuzzleEasy = this.loadPuzzleEasy.bind(this);
    this.createPuzzleEasy = this.createPuzzleEasy.bind(this);
    this.setDifficultyMedium = this.setDifficultyMedium.bind(this);
    this.setDifficultyHard = this.setDifficultyHard.bind(this);
    this.setDifficultyExpert = this.setDifficultyExpert.bind(this);
    this.generatePiecesEasy = this.generatePiecesEasy.bind(this);
    this.shuffleArray = this.shuffleArray.bind(this);
    this.scramblePuzzle = this.scramblePuzzle.bind(this);
    this.assignTiles = this.assignTiles.bind(this);
    this.swapTiles = this.swapTiles.bind(this);

  }

  // Set the puzzle's state to easy, define the grid of puzzle pieces
  // and load the puzzle from the database.
  createPuzzleEasy(){
    this.setState({ difficulty: 'Easy' });
    for(var i = 0; i < 2; i++) {
      this.state.puzzleGrid[i] = [];
      for(var j = 0; j < 3; j++) {
        this.state.puzzleGrid[i][j] = { x: (i * -this.state.puzzleDimensions.easyWidth), y: (j * -this.state.puzzleDimensions.easyHeight)};
      }
    }
    this.loadPuzzleEasy();
  };

  // Fetches the puzzle from the psql database and saves the information in state.
  loadPuzzleEasy(){
    let board = document.querySelector('.board');
    let selectionModal = document.querySelector('.selection-modal');
    fetch(`/puzzles`)
      .then(r => r.json())
      .then((data) => {
        this.setState({
          puzzleName: data[0].name,
          puzzleURL: data[0].url
        });
        selectionModal.style.display = 'none';
        this.generatePiecesEasy();
      })
      .catch(err => console.log(err));
  }

  // Separates the puzzle image into 6 separate divs.
  generatePiecesEasy(){
    let board = document.querySelector('.board');
    let counter = 0;
    let grid = this.state.puzzleGrid;
    let image = this.state.puzzleURL;
    let easyHeight = this.state.puzzleDimensions.easyHeight;
    let easyWidth = this.state.puzzleDimensions.easyWidth;

    for(let a = 0; a < grid.length; a++) {
      for(let b = 0; b < grid[a].length; b++) {
        let block = document.createElement("div");
        block.className = 'piece';
        block.id = 'piece' + counter;
        block.style.backgroundImage = image;
        block.style.backgroundPosition = grid[a][b].x + 'px ' + grid[a][b].y + 'px';
        block.style.height = easyHeight + 'px';
        block.style.width = easyWidth + 'px';
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

  scramblePuzzle() {
    if(!this.state.shuffled) {
      this.setState({ shuffled: true });
      let board = document.querySelector('.board');
      board.addEventListener('click', () => {
        this.assignTiles(event);
        this.swapTiles();
      });
      let puzzlePieces = document.querySelectorAll('.piece');
      for(let i = 0; i < puzzlePieces.length; i++) {
        puzzlePieces.className = 'clickPiece';
        let target = Math.floor(Math.random() * puzzlePieces.length - 1) + 1;
        let target2 = Math.floor(Math.random() * puzzlePieces.length - 1) + 1;
        board.insertBefore(puzzlePieces[target], puzzlePieces[target2]);
      }
    }
  }

  // assignTiles(event) {
  //   let piece = document.querySelectorAll('.piece');

  //   if(this.state.turn === 0) {
  //     this.setState({
  //       divA: event.target.style.backgroundPosition,
  //       divAID: event.target.id,
  //       turn: 1
  //     })
  //   } else {
  //     this.setState({
  //       divB: event.target.style.backgroundPosition,
  //       divBID: event.target.id,
  //       turn: 0
  //     })
  //   }
  // }

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


  assignTiles(event) {
    let piece = document.querySelectorAll('.piece');
    let turn = this.state.turn;
    let divA = this.state.divA;
    let divB = this.state.divB;
    let holder = this.state.holder;
    let divAID = this.state.divAID;
    let divBID = this.state.divBID;
    let holderID = this.state.holderID;

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
        divBID: event.target.id,
        holder: event.target.style.backgroundPosition,
        holderID: event.target.id,
       })
      // console.log("before change divA: ", divA);
      // console.log("before change divB: ", divB);
      // console.log('holder', holder);
      // divA = divB;
      // console.log("after change divA: ", divA);
      // divB = holder;
      // console.log("after change divB: ", divB);
      // divBID = divAID;
      // divAID = holderID;
      this.setState({ turn: 2 });
    }
  }


  setDifficultyMedium(){
    console.log("setting difficulty to medium");
    this.setState({
      difficulty: 'Medium'
    });
    this.loadPuzzleEasy();
  }

  setDifficultyHard(){
    console.log("setting difficulty to hard");
    this.setState({
      difficulty: 'Hard'
    });
    this.loadPuzzleEasy();
  }

  setDifficultyExpert(){
    console.log("setting difficulty to expert");
    this.setState({
      difficulty: 'Expert'
    });
    this.loadPuzzleEasy();
  }

  render(){
    return(
      <div className="gamepage-container">

      <div className="gamepage-view">
        <h1> Game Page </h1>
        <InfoPanel />
        <Board
          scramblePuzzle={this.scramblePuzzle}
        />
      </div>

      <div className="selection-modal">
        <button onClick={this.createPuzzleEasy}>Easy</button>
        <button onClick={this.setDifficultyMedium}>Medium</button>
        <button onClick={this.setDifficultyHard}>Hard</button>
        <button onClick={this.setDifficultyExpert}>Expert</button>
      </div>

      </div>
    )
  }
}

export default GamePage;
