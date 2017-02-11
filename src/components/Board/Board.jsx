import React, { Component } from 'react';
import style from './Board.css';


class Board extends Component {

  render(){

    return(
      <div className="board-container">
        <div className="board"></div>
        <div className="board-button-container">
          <button className="start button" onClick={this.props.scramblePuzzle}>START</button>
          <button className="new-puzzle button" onClick={this.props.newPuzzle}>NEW PUZZLE</button>
        </div>
      </div>
    )
  }
}

export default Board;
