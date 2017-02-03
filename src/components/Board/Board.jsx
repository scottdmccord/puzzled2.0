import React, { Component } from 'react';
import style from './Board.css';

class Board extends Component {

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
      })
      .catch(err => console.log(err));
  }

  render(){
    return(
      <div className="board-container">
        <div className="board"></div>
        <div className="board-button-container">
          <button className="start button" onClick={this.getPuzzle}>START</button>
          <button className="new-puzzle button">NEW PUZZLE</button>
        </div>
      </div>
    )
  }
}

export default Board;
