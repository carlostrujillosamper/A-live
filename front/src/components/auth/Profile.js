import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';


class Profile extends Component {
  constructor(){
      super();
      this.state = { user: {} };
  }

  getUser = () =>{

    axios.get(`http://localhost:5000/auth/userData`,{headers: {'Content-Type':'application/json','Access-Control-Allow-Origin': '*'}})
   
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
        
        <div style={{width: '60%', float:"left"}}>
         <h2>{this.state.user.username}</h2>
        </div>
      </div>
      
    )
  }
}

export default Profile;
