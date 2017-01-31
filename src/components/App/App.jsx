import React, { Component } from 'react';
import NavBar from '../NavBar/NavBar.jsx';
import Landing from '../Landing/Landing.jsx';

class App extends Component {
  constructor(props){
    super();

  }

  render(){
    return(
      <container>
        <NavBar />
        <Landing />
      </container>
    )
  }
}

export default App;
