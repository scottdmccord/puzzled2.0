import React, { Component } from 'react';
import { Link } from 'react-router';
import style from './NavBar.css';

class NavBar extends Component {
  render(){
    return(
      <div className="navbar">
        <div className="navbar-category"><Link to="/">Home</Link></div>
        <div className="navbar-category">About</div>
        <div className="navbar-category"><Link to="/login">Log In</Link></div>
        <div className="navbar-category"><Link to="/signup">Sign Up</Link></div>
        <div className="navbar-category"><Link to="/gamepage">Play</Link></div>
        <div className="navbar-category"><Link onClick={this.props.logOut} to="/">Log Out</Link></div>
      </div>
    )
  }
}

export default NavBar;
