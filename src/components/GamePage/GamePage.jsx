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
    }

    this.getPuzzle = this.getPuzzle.bind(this);

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

  render(){
    return(
      <div className="gamepage-container">

      <div className="gamepage-view">
        <h1> Game Page </h1>
        <InfoPanel />
        <Board />
      </div>

      <div className="selection-modal">
        <button>Easy</button>
        <button>Medium</button>
        <button>Hard</button>
        <button>Expert</button>
        <button onClick={this.getPuzzle}>Start</button>
      </div>

      </div>
    )
  }
}

export default GamePage;
