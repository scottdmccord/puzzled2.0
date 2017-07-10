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

        // show log out button
        let logoutNav = document.getElementById('logout-nav');
        logoutNav.style.display = "inline-block";

        // hide sign-up and sign-in buttons
        let signupNav = document.getElementById('signup-nav');
        let loginNav = document.getElementById('login-nav');
        signupNav.style.display = 'none';
        loginNav.style.display = 'none';

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
        <h1 id="login-text">Log In</h1>
        <form id="login-form">
          <h3 id="login-notification"></h3>
          <table>
            <tbody>
              <tr>
                <td><label>Username:</label></td>
                <td className="right-column">
                  <input
                    type="text"
                    placeholder="enter username"
                    value={this.state.userLogin.username}
                    onChange={this.updateUsername}
                  />
                </td>
              </tr>
              <tr>
                <td><label>Password:</label></td>
                <td className="right-column">
                  <input
                    type="password"
                    placeholder="enter password"
                    value={this.state.userLogin.password}
                    onChange={this.updatePassword}
                  />
                </td>
              </tr>
            </tbody>
          </table>
          <button className="enter-button" onClick={this.userLogin}>Enter</button>
        </form>
      </div>
    )
  }
}

export default withRouter(LogIn);
