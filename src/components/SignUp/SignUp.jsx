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

  createUser() {
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
    .then(() => {
      this.props.router.push('/login');
      debugger;
      this.setState({
        username: '',
        password: '',
        email: ''
      })
      console.log("Changing route");
      // debugger
      // this.props.router.push('/login');
    })
    .catch(error => console.log(error));
  }

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
          <button onClick={this.createUser}> Sign Up </button>
        </form>
      </div>
    )
  }
}

export default withRouter(SignUp);
