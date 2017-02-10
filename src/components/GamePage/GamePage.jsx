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
      puzzleGrid: []
    }

    this.loadPuzzleEasy = this.loadPuzzleEasy.bind(this);
    this.createPuzzleEasy = this.createPuzzleEasy.bind(this);
    this.setDifficultyMedium = this.setDifficultyMedium.bind(this);
    this.setDifficultyHard = this.setDifficultyHard.bind(this);
    this.setDifficultyExpert = this.setDifficultyExpert.bind(this);
    this.generatePiecesEasy = this.generatePiecesEasy.bind(this);
    this.scramblePuzzle = this.scramblePuzzle.bind(this);

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

  //

  scramblePuzzle() {
    console.log("SCRAMBLING!");
    console.log(this.state);
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
