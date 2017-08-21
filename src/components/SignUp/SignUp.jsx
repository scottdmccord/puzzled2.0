import React, { Component } from 'react';
import { Link, withRouter } from 'react-router';
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
    this.createUser = this.createUser.bind(this);

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

  createUser(e) {
    e.preventDefault();
    console.log('starting fetch');
    fetch('/users', {
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
      method: 'POST',
      body: JSON.stringify({
        username: this.state.username,
        password: this.state.password,
        email: this.state.email
      })
    })
    .then((data) => {
      console.log("hello");
      if(data.status === 400) {
        console.log("Username already exists. Please choose another.");
        let signupNotification = document.getElementById('signup-notification');
        signupNotification.style.display = "inline-block";
        signupNotification.innerHTML = "Username already exists. Please choose another.";
      } else {
        let signupNotification = document.getElementById('signup-notification');
        signupNotification.style.display = "none";
        this.userLogin(e);
        // this.props.router.push('/login');
      }
    })
    .catch(error => console.log(error));
  }

    userLogin(e) {
    let loggedIn = false;
    e.persist();
    console.log("posting the login!");
    fetch('/users/login', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        username: this.state.username,
        password: this.state.password
      })
    })
    .then(r => r.json())
    .then((data) => {

        loggedIn = true;
        this.props.updateCurrentToken(data.token);
        this.props.updateUserID(data.id);
        this.props.updateUsername(data.username);
        this.props.router.push('/gamepage');

        // show log out button
        let logoutNav = document.getElementById('logout-nav');
        logoutNav.style.display = 'inline-block';

        // hide sign-up and sign-in buttons
        let signupNav = document.getElementById('signup-nav');
        let loginNav = document.getElementById('login-nav');
        signupNav.style.display = 'none';
        loginNav.style.display = 'none';
    })
    .catch(err => {
      console.log(err);
    });
  }

  render(){
    return(
      <div className="signup-container">
        <h1 id="signup-text">Sign Up</h1>
        <form id="signup-form">
          <h3 id="signup-notification"></h3>
          <table>
            <tbody>
              <tr>
                <td><label>Username:</label></td>
                <td className="right-column">
                  <input
                    type="text"
                    placeholder="enter username"
                    value={this.state.username}
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
                    value={this.state.password}
                    onChange={this.updatePassword}
                  />
                </td>
              </tr>
              <tr>
                <td><label>Email Address:</label></td>
                <td className="right-column">
                  <input
                    type="email"
                    placeholder="enter email"
                    value={this.state.email}
                    onChange={this.updateEmail}
                  />
                </td>
              </tr>
            </tbody>
          </table>
          <button className="enter-button" onClick={this.createUser}> Enter </button>
        </form>
      </div>
    )
  }
}

export default withRouter(SignUp);
