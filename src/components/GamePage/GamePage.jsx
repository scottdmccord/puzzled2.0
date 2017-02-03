import React, { Component } from 'react';
import style from './GamePage.css';
import InfoPanel from '../InfoPanel/InfoPanel.jsx';
import Board from '../Board/Board.jsx';

class GamePage extends Component {
  render(){
    return(
      <div className="gamepage-container">
        <h1> Game Page </h1>
        <InfoPanel />
        <Board />
      </div>
    )
  }
}

export default GamePage;
