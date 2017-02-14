import React, { Component } from 'react';
import style from './InfoPanel.css';

class InfoPanel extends Component {
  render(){
    return(
      <div className="infopanel-container">
        <h2> Info Panel </h2>
        <h4> TIME: {this.props.timer.hoursONES + this.props.timer.hoursONES + ' '} hours
                   {' ' + this.props.timer.minutesTENS + this.props.timer.minutesONES + ' '} minutes
                   {' ' + this.props.timer.secondsTENS + this.props.secondONES + ' '} seconds
                   {' ' + this.props.timer.milisecondsTENS + this.props.timer.milisecondsONES + ' '} miliseconds
        </h4>
      </div>
    )
  }
}

export default InfoPanel;
