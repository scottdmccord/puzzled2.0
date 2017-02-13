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
      userID: '',
      username: ''
    }
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

  render(){
    return(
      <container>
        <NavBar />
        <h1> TEST REACT ROUTER </h1>
        {this.props.children && React.cloneElement(this.props.children, {
          state: this.state,
          updateCurrentToken: this.updateCurrentToken.bind(this),
          updateUserID: this.updateUserID.bind(this),
          updateUsername: this.updateUsername.bind(this),
          username: this.state.username
        })}
      </container>
    )
  }
}

export default App;
