import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';


class Profile extends Component {
  constructor(){
      super();
      this.state = { user: {} };
  }

  getUser = () =>{

    axios.get(`${process.env.REACT_APP_URL}/userData`,{headers: {'Content-Type':'application/json','Access-Control-Allow-Origin': '*'}})
   
    .then(responseFromApi => {
      console.log(responseFromApi)
      // this.setState({
      //   user: responseFromApi.data
      // })
      
    })
    .catch(err=>console.log(err))
  }

  componentDidMount() {
    this.getUser();
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
