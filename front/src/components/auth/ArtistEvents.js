import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import AuthService from "./AuthService";

class ArtistEvents extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userInSession: this.props.userInSession,
      artistEvents: [],
      isLoading: true,
    };
    this.service = new AuthService();
  }


  getArtistEvents = () => {
    const { params } = this.props.match;
    let finalArr =[]
    this.service
      .artistEvents(params.keyword)
      .then(responseFromApi => {
        
        this.setState({
          artistEvents: responseFromApi,
          isLoading: false
        });
      })
      .catch(err => {
        console.log(err);
      });
  };

  componentDidMount() {
    this.getArtistEvents();
  }

  render() {
    const selectedArtist = this.state.userInSession.favouriteArtists.find(artist=>artist.name===this.props.match.params.keyword)
    return (
      <div className="artist-events">
        <div className="img-container" style={{backgroundImage:`url("${selectedArtist.images[0].url}")`}}>
        <p>{selectedArtist.name}</p>
        </div>
        <img src="https://res.cloudinary.com/dpi75nntc/image/upload/v1584041832/Group_13_okpxqy.png"></img>
        <div className="event-info-container">
          {this.state.artistEvents.length!==0?
          this.state.artistEvents.map(event=>
          <div className='event-info'>
            <Link className="link-to-details" to={`/event-details/${selectedArtist.name}/${event.id}`}><p>{event._embedded.venues[0].city.name} - {event._embedded.venues[0].name} {event.dates.start.localDate} <i class="fa fa-star-o" aria-hidden="true"></i> </p></Link>
          </div>
            
          ):<h3>Bad luck! No upcoming events</h3>}
        </div>

      </div>
    );
  }
}

export default ArtistEvents;
