import React, { Component } from 'react';
import { Link } from 'react-router';
import style from './NavBar.css';

// <div id="about-nav" className="navbar-category">About</div>
class NavBar extends Component {
  render(){
    return(
      <div className="navbar">
        <div id="home-nav" className="navbar-category"><Link to="/">Home</Link></div>
        <div id="signup-nav" className="navbar-category"><Link to="/signup">Sign Up</Link></div>
        <div id="login-nav" className="navbar-category"><Link to="/login">Log In</Link></div>
        <div id="play-nav" className="navbar-category"><Link to="/gamepage">Play</Link></div>
        <div id="how-to-nav" className="navbar-category"><Link to="/instructions">How to Play</Link></div>
        <div id="logout-nav" className="navbar-category"><Link onClick={this.props.logOut} to="/">Log Out</Link></div>
      </div>
    )
  }
}

export default NavBar;
