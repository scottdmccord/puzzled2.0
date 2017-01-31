import React, { Component } from 'react';
import style from './Landing.css';

class Landing extends Component {
  render() {
    return(
      <div className="LandingContainer">
        <h1> Puzzled 2.0 </h1>

        <div className="OptionContainer">
          <div className="SignUp">Sign Up</div>
          <div className="LogIn">Log In</div>
        </div>
      </div>
      )
  }
}

export default Landing;
