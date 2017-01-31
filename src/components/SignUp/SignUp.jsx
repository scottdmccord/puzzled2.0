import React, { Component } from 'react';
import Style from './SignUp.css';

class SignUp extends Component {
  render(){
    return(
      <div className="signup-container">
        <h1>Sign Up</h1>
        <form>
          <label>Username:</label>
          <input />
          <label>Password:</label>
          <input />
          <label>Email Address:</label>
          <input />
        </form>
      </div>
    )
  }
}

export default SignUp;
