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

    this.getPuzzle = this.getPuzzle.bind(this);
    this.setDifficultyEasy = this.setDifficultyEasy.bind(this);
    this.setDifficultyMedium = this.setDifficultyMedium.bind(this);
    this.setDifficultyHard = this.setDifficultyHard.bind(this);
    this.setDifficultyExpert = this.setDifficultyExpert.bind(this);
    this.createBoardEasy = this.createBoardEasy.bind(this);

  }

  getPuzzle(){
    let board = document.querySelector('.board');
    let selectionModal = document.querySelector('.selection-modal');
    // console.log(board);
    fetch(`/puzzles`)
      .then(r => r.json())
      .then((data) => {
        this.setState({
          puzzleName: data[0].name,
          puzzleURL: data[0].url
        });
        console.log(this.state);
        selectionModal.style.display = 'none';
        this.createBoardEasy();
      })
      .catch(err => console.log(err));
  }

  setDifficultyEasy(){
    console.log("setting difficulty to easy");
    this.setState({
      difficulty: 'Easy'
    });

    for(var i = 0; i < 2; i++) {
      this.state.puzzleGrid[i] = [];
      for(var j = 0; j < 3; j++) {
        this.state.puzzleGrid[i][j] = { x: (i * -this.state.puzzleDimensions.easyWidth), y: (j * -this.state.puzzleDimensions.easyHeight)};
      }
    }
    this.getPuzzle();
  }

  setDifficultyMedium(){
    console.log("setting difficulty to medium");
    this.setState({
      difficulty: 'Medium'
    });
    this.getPuzzle();
  }

  setDifficultyHard(){
    console.log("setting difficulty to hard");
    this.setState({
      difficulty: 'Hard'
    });
    this.getPuzzle();
  }

  setDifficultyExpert(){
    console.log("setting difficulty to expert");
    this.setState({
      difficulty: 'Expert'
    });
    this.getPuzzle();
  }

  createBoardEasy(){
    let board = document.querySelector('.board');
    let counter = 0;
    let grid = this.state.puzzleGrid;
    let image = this.state.puzzleURL;
    let easyHeight = this.state.puzzleDimensions.easyHeight;
    let easyWidth = this.state.puzzleDimensions.easyWidth;

    console.log("THIS IS THE GRID: ", grid);
    console.log("THIS IS THE URL: ", image);
    console.log("THIS IS THE HEIGHT: ", easyHeight);
    console.log("THIS IS THE WIDTH: ", easyWidth);

    for(let a = 0; a < grid.length; a++) {
      for(let b = 0; b < grid[a].length; b++) {
        let block = document.createElement("div");
        block.className = 'piece';
        block.id = 'piece' + counter;
        block.style.backgroundImage = image;
        block.style.backgroundPositon = grid[a][b].x + 'px ' + grid[a][b].y + 'px';
        block.style.height = easyHeight + 'px';
        block.style.width = easyWidth + 'px';
        board.appendChild(block);
        counter++;
      }
    }
  }


  render(){
    return(
      <div className="gamepage-container">

      <div className="gamepage-view">
        <h1> Game Page </h1>
        <InfoPanel />
        <Board />
      </div>

      <div className="selection-modal">
        <button onClick={this.setDifficultyEasy}>Easy</button>
        <button onClick={this.setDifficultyMedium}>Medium</button>
        <button onClick={this.setDifficultyHard}>Hard</button>
        <button onClick={this.setDifficultyExpert}>Expert</button>
      </div>

      </div>
    )
  }
}

export default GamePage;
