import React, { Component } from 'react';
import style from './GamePage.css';
import InfoPanel from '../InfoPanel/InfoPanel.jsx';
import Board from '../Board/Board.jsx';

class GamePage extends Component {

  constructor(){
    super();

    this.state = {
      puzzleName: '',
      puzzleURL: '',
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
      }
    }

    this.getPuzzle = this.getPuzzle.bind(this);
    this.setDifficultyEasy = this.setDifficultyEasy.bind(this);
    this.setDifficultyMedium = this.setDifficultyMedium.bind(this);
    this.setDifficultyHard = this.setDifficultyHard.bind(this);
    this.setDifficultyExpert = this.setDifficultyExpert.bind(this);

  }

  getPuzzle(){
    let board = document.querySelector('.board');
    let selectionModal = document.querySelector('.selection-modal');
    console.log(board);
    fetch(`/puzzles`)
      .then(r => r.json())
      .then((data) => {
        this.setState({
          puzzleName: data[0].name,
          puzzleURL: data[0].url
        });
        console.log(this.state);
        board.style.backgroundImage = this.state.puzzleURL;
        selectionModal.style.display = 'none';
      })
      .catch(err => console.log(err));
  }

  setDifficultyEasy(){
    console.log("setting difficulty to easy");
    this.setState({
      difficulty: 'Easy'
    });
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
