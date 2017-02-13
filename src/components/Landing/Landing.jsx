import React, { Component } from 'react';
import { Link } from 'react-router';
import style from './Landing.css';

class Landing extends Component {
  render() {
    return(
      <div className="landing-container">
        <h1> Puzzled 2.0 </h1>

        <div className="option-container">
          <div className="signup"><Link to="/signup">Sign Up</Link></div>
          <div className="login"><Link to="/login">Log In</Link></div>
        </div>
      </div>
      )
  }
}

export default Landing;
