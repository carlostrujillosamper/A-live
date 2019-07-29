import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import AuthService from './AuthService';

class ArtistEvents extends Component {
  constructor(props){
      super(props);
      this.state = { artistEvents: [], isLoading:true };
      this.service = new AuthService()
  }

  // getAllEvents = () =>{
  //  this.service.yourArtists()
  //   .then(responseFromApi => {
     
      
  //     this.setState({
  //       favouriteArtist: responseFromApi.splice(1,responseFromApi.length),
  //       isLoading: false

  //     })

      
  //   })
  // }
  getArtistEvents = () => {
    const  {params}  = this.props.match;
    // console.log(this.props)
    this.service.artistEvents(params.keyword)
    .then( responseFromApi =>{
      // console.log(responseFromApi)
        // const theProject = responseFromApi.data;
        this.setState({
          artistEvents:responseFromApi,
          isLoading:false
        });
    })
    .catch((err)=>{
        console.log(err)
    })
}

  componentDidMount() {
    this.getArtistEvents();
  }

  render(){
    return(
      <div>

        
        <div className="event-list">

          
       
            {!this.state.isLoading ? this.state.artistEvents.map(event=>{
             return (
                
                 <div className="card-event">
      <header style={{backgroundImage:'url(' + event.images[0].url + ')'}}  className="card-header">
        <h4 className="card-header--title"> </h4>
      </header>
      <div className="card-body">
         <p className="date-event">{event.dates.start.localDate}</p>
         <Link to={`/event-parties/${event.id}`}>

         <h2>{event.name}</h2>
        </Link>
        <p className="body-content">{event._embedded.venues.city} || {event._embedded.venues.name} || {event._embedded.venues[0].address.line1}</p>
        
        
      </div>
              </div>
             
                )
            }):<h3>Loading...</h3>}
 
        </div>
      </div>
      
    )
  }
}

export default ArtistEvents;




