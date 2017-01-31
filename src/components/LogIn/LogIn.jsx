import React, { Component } from 'react';
import style from './LogIn.css';

class LogIn extends Component {
  render(){
    return(
      <div className="login-container">
        <h1>Log In</h1>
        <form>
          <label>Username:</label><input />
          <label>Password:</label><input />
        </form>
      </div>
    )
  }
}

export default LogIn;
