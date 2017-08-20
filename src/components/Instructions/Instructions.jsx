import React, { Component } from 'react';
import { Link, withRouter } from 'react-router';
import style from './Instructions.css';

export default class Instructions extends Component {
  render() {
    return (
      <div className="instructions-container">
        <h2 className='align-center'> How to Play </h2>
        <img className='instruction-image' src={'http://i.imgur.com/OYFgdvu.png'}/>
        <p> First, select your puzzle difficulty. Easy puzzles have nine pieces. Medium puzzles have 24 pieces. Hard puzzles have 48 pieces. And expert puzzles have 160 pieces. </p>
        <p>After you've selected your difficult, the board will appear in the center of the page. Take some time to study the picture, as you won't be able to reference it again once you've started.</p>
        <img className='instruction-image' src={'http://i.imgur.com/B6RYFcJ.png'}/>
        <p>When you're ready, click the "Start" button to scramble the puzzle.</p>
        <img className='instruction-image' src={'http://i.imgur.com/wh4lekw.png'}/>
        <p>After the pieces have been shuffled, you may now switch the puzzle pieces. To do this, first click on a puzzle piece. Once the first puzzle piece is clicked, click on another puzzle piece. The second click will cause the pieces to switch places.</p>
        <img className='instruction-image' src={'http://i.imgur.com/fnsnWKh.png'}/>
        <p>Continue swapping pieces until the puzzle is fully back together. Once you've completed the puzzle, you will receive a win alert. You may also choose to start a new puzzle anytime by clicking on the "New Puzzle" button.</p>
        <p>If you've completed the puzzle in under the top three listed times, your name will appear on the leaderboard.</p>
        <p className='align-center'>Good luck!</p>
      </div>
    )
  }
}
