import React, { Component } from 'react';
import { Link } from 'react-router';
import style from './Landing.css';

class Landing extends Component {
  render() {
    return(
      <div className="landing-container">
        <h1 id="welcome-title"> Puzzled 2.0 </h1>
        <div id="welcome-text">Sip some tea, grab a blanket, and focus your mind. <br/> Ready for a puzzle?</div>
        <div id="option-container">
          <div id="signup" className="landing-button"><Link to="/signup">Sign Up</Link></div>
          <div id="login" className="landing-button"><Link to="/login">Log In</Link></div>
        </div>
      </div>
      )
  }
}

export default Landing;
