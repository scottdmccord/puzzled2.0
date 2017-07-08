import React, { Component } from 'react';
import { Link, withRouter } from 'react-router';
import style from './LogIn.css';

class LogIn extends Component {
  constructor() {
    super();

    this.state = {
      userLogin: {
        username: '',
        password: ''
      },
      message: ''
    }

    this.updateUsername = this.updateUsername.bind(this);
    this.updatePassword = this.updatePassword.bind(this);
    // this.updateMessage = this.updateMessage.bind(this);
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

  updateMessage(e) {
    this.setState({
      message: e.target.value
    })
  }

  userLogin(e) {
    let loggedIn = false;
    e.preventDefault();
    console.log("posting the login!");
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
      if(!data.message) {
        loggedIn = true;
        this.props.updateCurrentToken(data.token);
        this.props.updateUserID(data.id);
        this.props.updateUsername(data.username);
        let loginNotification = document.getElementById('login-notification');
        loginNotification.style.display = "none";
        this.props.router.push('/gamepage');
      } else {
        this.setState({
          message: "Invalid username or password"
        });
        let loginNotification = document.getElementById('login-notification');
        loginNotification.style.display = "inline-block";
        loginNotification.innerHTML = this.state.message;
      }
    })
    .catch(err => console.log("This is the error", err));
  }

  render(){
    return(
      <div className="login-container">
        <h1>Log In</h1>
        <form>
          <h1 id="login-notification"></h1>
          <label>Username:</label>
          <input
            type="text"
            placeholder="enter username"
            value={this.state.userLogin.username}
            onChange={this.updateUsername}
          />
          <label>Password:</label>
          <input
            type="password"
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

export default withRouter(LogIn);
