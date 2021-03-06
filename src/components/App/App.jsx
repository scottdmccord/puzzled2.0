import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import NavBar from '../NavBar/NavBar.jsx';
import Landing from '../Landing/Landing.jsx';
import style from './App.css';

class App extends Component {
  constructor(props){
    super();

    this.state = {
      currentToken: '',
      userID: 1,
      username: 'Guest'
    }

    this.logOut = this.logOut.bind(this);
  }

  updateCurrentToken(newToken) {
    this.setState({
      currentToken: newToken
    });
  }

  updateUserID(userID) {
    this.setState({
      userID: userID
    });
  }

  updateUsername(username) {
    this.setState({
      username: username
    });
  }

  logOut() {
    console.log('logging out');
    this.setState({
      currentToken: '',
      userID: '1',
      username: 'Guest'
    });

    // hide logout button
    let logoutNav = document.getElementById('logout-nav');
    logoutNav.style.display = 'none';

    // display sign-up and log-in buttons
    let signupNav = document.getElementById('signup-nav');
    let loginNav = document.getElementById('login-nav');
    signupNav.style.display = 'inline-block';
    loginNav.style.display = 'inline-block';


  }

  render(){
    return(
      <container>
        <link href="https://fonts.googleapis.com/css?family=PT+Sans" rel="stylesheet"></link>
        <NavBar
          logOut={this.logOut}
        />

        {this.props.children && React.cloneElement(this.props.children, {
          state: this.state,
          updateCurrentToken: this.updateCurrentToken.bind(this),
          updateUserID: this.updateUserID.bind(this),
          updateUsername: this.updateUsername.bind(this),
          username: this.state.username,
          userID: this.state.userID
        })}

      </container>
    )
  }
}

export default App;
