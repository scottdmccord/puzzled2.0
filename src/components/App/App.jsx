import React, { Component } from 'react';
import NavBar from '../NavBar/NavBar.jsx';
import Landing from '../Landing/Landing.jsx';
import LogIn from '../LogIn/LogIn.jsx';
import SignUp from '../SignUp/SignUp.jsx';
import GamePage from '../GamePage/GamePage.jsx';
import style from './App.css';

class App extends Component {
  constructor(props){
    super();

    this.state = {
      currentToken: '',
      userID: ''
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

  render(){
    return(
      <container>
        <NavBar />
        <Landing />
        <LogIn
          updateCurrentToken={this.updateCurrentToken.bind(this)}
          updateUserID={this.updateUserID.bind(this)}
        />
        <SignUp />
        <GamePage />
      </container>
    )
  }
}

export default App;
