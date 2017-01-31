import React, { Component } from 'react';
import style from './Landing.css';

class Landing extends Component {
  render() {
    return(
      <div className="landing-container">
        <h1> Puzzled 2.0 </h1>

        <div className="option-container">
          <div className="signup">Sign Up</div>
          <div className="login">Log In</div>
        </div>
      </div>
      )
  }
}

export default Landing;
