import React, { Component } from 'react';
import Style from './SignUp.css';

class SignUp extends Component {
  constructor() {
    super()

    this.state = {
      username: '',
      password: '',
      email: '',
    }

    this.updateUsername = this.updateUsername.bind(this);
    this.updatePassword = this.updatePassword.bind(this);
    this.updateEmail = this.updateEmail.bind(this);

  }

    updateUsername(e) {
      this.setState({
        username: e.target.value
      });
    };

    updatePassword(e) {
      this.setState({
        password: e.target.value
      });
    };

    updateEmail(e) {
      this.setState({
        email: e.target.value
      });
    };

  render(){
    return(
      <div className="signup-container">
        <h1>Sign Up</h1>
        <form>
          <label>Username:</label>
          <input
            type="text"
            placeholder="enter username"
            value={this.state.username}
            onChange={this.updateUsername}
          />
          <label>Password:</label>
          <input
            type="password"
            placeholder="enter password"
            value={this.state.password}
            onChange={this.updatePassword}
          />
          <label>Email Address:</label>
          <input
            type="email"
            placeholder="enter email"
            value={this.state.email}
            onChange={this.updateEmail}
          />
          <button> Sign Up </button>
        </form>
      </div>
    )
  }
}

export default SignUp;
