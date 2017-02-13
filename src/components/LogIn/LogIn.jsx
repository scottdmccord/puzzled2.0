import React, { Component } from 'react';
import { Link } from 'react-router';
import style from './LogIn.css';

class LogIn extends Component {
  constructor() {
    super();

    this.state = {
      userLogin: {
        username: '',
        password: ''
      }
    }

    this.updateUsername = this.updateUsername.bind(this);
    this.updatePassword = this.updatePassword.bind(this);
    this.userLogin = this.userLogin.bind(this);
  }

  updateUsername(e) {
    this.setState({
      userLogin: {
        username: e.target.value,
        password: this.state.userLogin.password
      }
    });
  }

  updatePassword(e) {
    this.setState({
      userLogin: {
        username: this.state.userLogin.username,
        password: e.target.value
      }
    });
  }

  userLogin(e) {
    e.preventDefault();
    console.log("posting the login!");
    console.log(this);
    fetch('/users/login', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        username: this.state.userLogin.username,
        password: this.state.userLogin.password
      })
    })
    .then(r => r.json())
    .then((data) => {
      this.props.updateCurrentToken(data.token);
      this.props.updateUserID(data.id);
      this.setState({
        userLogin: {
          username: '',
          password: ''
        }
      }, () => {
        console.log(this.state);
      })
    })
  }

  render(){
    return(
      <div className="login-container">
        <h1>Log In</h1>
        <form>
          <label>Username:</label>
          <input
            type="text"
            placeholder="enter username"
            value={this.state.userLogin.username}
            onChange={this.updateUsername}
          />
          <label>Password:</label>
          <input
            type="text"
            placeholder="enter password"
            value={this.state.userLogin.password}
            onChange={this.updatePassword}
          />
          <button onClick={this.userLogin}>Enter</button>
        </form>
      </div>
    )
  }
}

export default LogIn;
