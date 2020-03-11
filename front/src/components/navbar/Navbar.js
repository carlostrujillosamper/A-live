// navbar/Navbar.js

import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import AuthService from '../auth/AuthService';

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = { loggedInUser: this.props.userInSession };
    this.service = new AuthService();
    
  }

  handleLogout = (e) => {
    this.props.logout()
  }

  render() {
    console.log(this.state)
    console.log(this.props)
    if (this.state.loggedInUser) {
      return (
        <nav className="nav-style">
          <ul>
            <li onClick={this.handleLogout} >Logout</li>
            {/* <li><Link to='/topartists'>TopArtists</Link></li> */}
          </ul>

          {/* <h2><img className="profile-pic" src={this.state.loggedInUser.photo}/>{this.state.loggedInUser.username} </h2> */}
        </nav>
      )
    } else {
      return (
        <div>
          <nav className="nav-style">
            <ul>
            <li><Link to='/signup'>Signup</Link></li>
            <li><Link to='/login'>Login</Link></li>
            <li><Link to='/profile'>Profile</Link></li>

            </ul>
          </nav>
        </div>
      )
    }
  }
}

export default Navbar;
