import React, { Component } from 'react';
import style from './InfoPanel.css';

class InfoPanel extends Component {
  render(){
    return(
      <div id="info-panel-container">
        <div id="info-panel-content">
        <h4> TIME: {this.props.hoursTENS +  '' + this.props.hoursONES + ':' +
                   this.props.minutesTENS + this.props.minutesONES + ':' +
                   this.props.secondsTENS + this.props.secondsONES + ':' +
                   this.props.millisecondsHUNDREDS + this.props.millisecondsTENS}
        </h4>
        <h2>Best Times: </h2>
        <h4> 1st Place: {this.props.highscore1_user} @ {this.props.highscore1} </h4>
        <h4> 2nd Place: {this.props.highscore2_user} @ {this.props.highscore2} </h4>
        <h4> 3rd Place: {this.props.highscore3_user} @ {this.props.highscore3} </h4>
        </div>
      </div>
    )
  }
}

export default InfoPanel;
