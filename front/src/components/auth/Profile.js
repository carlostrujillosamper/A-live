import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';


class Profile extends Component {
  constructor(props){
      super(props);
      this.state = { user: {} };

  }

  handleLogout = (e) => {
    this.props.logout()
  }





  render(){

    return(
      <div>
        
        <div>
        <h2 style={{color:"white"}} onClick={this.handleLogout} >Logout</h2>
        </div>
      </div>
      
    )
  }
}

export default Profile;
