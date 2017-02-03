import React, { Component } from 'react';
import style from './Board.css';

class Board extends Component {

  render(){
    return(
      <div className="board-container">
        <div className="board"></div>
        <div className="board-button-container">
          <button className="start button">START</button>
          <button className="new-puzzle button">NEW PUZZLE</button>
        </div>
      </div>
    )
  }
}

export default Board;
