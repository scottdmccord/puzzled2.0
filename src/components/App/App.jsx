import React, { Component } from 'react';
import NavBar from '../NavBar/NavBar.jsx';
import Landing from '../Landing/Landing.jsx';
import LogIn from '../LogIn/LogIn.jsx';
import style from './App.css';

class App extends Component {
  constructor(props){
    super();

  }

  render(){
    return(
      <container>
        <NavBar />
        <Landing />
        <LogIn />
      </container>
    )
  }
}

export default App;
