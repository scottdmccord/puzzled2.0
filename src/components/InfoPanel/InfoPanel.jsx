import React, { Component } from 'react';
import style from './InfoPanel.css';

class InfoPanel extends Component {
  render(){
    return(
      <div className="infopanel-container">
        <h2> Info Panel </h2>
        <h4> TIME: {this.props.hoursTENS +  '' + this.props.hoursONES + ':' +
                   this.props.minutesTENS + this.props.minutesONES + ':' +
                   this.props.secondsTENS + this.props.secondsONES + ':' +
                   this.props.millisecondsHUNDREDS + this.props.millisecondsTENS}
        </h4>
      </div>
    )
  }
}

export default InfoPanel;
