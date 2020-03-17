import React, { Component } from "react";
import AuthService from "./AuthService";
import { Link } from "react-router-dom";


export default class MyEvents extends Component {
  constructor() {
    super();
    this.state = {
      myFavouriteEvents: [],
    };
    this.service = new AuthService();
  }

  openPopUp() {
    let toggle = !this.state.popUpOpen;
    this.setState({
      ...this.state,
      popUpOpen: toggle
    });
  }
  closePopUp(){
    let toggle = !this.state.popUpOpen;
    this.setState({
      ...this.state,
      popUpOpen: toggle
    });
  }

  componentDidMount() {
    this.service.myEvents().then(myFavouriteEvents => {
      this.setState({
        ...this.state,
        myFavouriteEvents
      });
    });
  }
  render() {
    console.log(this.state)

    return (
      <div className="my-events-screen">
          <h2>My Events</h2>
          <hr></hr>
          <div className="event-card-container" >
        {this.state.myFavouriteEvents.map(event => (
          <Link className="link-to-details" to={`/event-details/${event.artist}/${event.eventId}`}>
          <div className="event-card" style={{  backgroundImage:`linear-gradient(rgba(0,0,0,0.8), rgba(0,0,0,0.8)),  url("${event.picture}")`}}>
            
            <h3>{event.artist}</h3>
            <p>{event.date}</p>
            <p>{event.country}</p>
            <p>{event.address}</p>
            <div className="fav-num-container">
              <i className="fa fa-star" aria-hidden="true"></i>
              <p>{event.members.length}</p>
            </div>
            
            
          </div>
          </Link>
        ))}
        </div>
      </div>
    );
  }
}
