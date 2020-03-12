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
    if (this.state.loggedInUser) {
      return (
        <nav className="nav-bar">
          {/* <img src="https://res.cloudinary.com/dpi75nntc/image/upload/v1584033500/gifgit_1_zllf84.png"></img>
          <i className="fa fa-cog" aria-hidden="true"></i> */}
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
