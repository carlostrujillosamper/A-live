import React, { Component } from "react";
import { Link } from "react-router-dom";
import AuthService from "./AuthService";

class TopArtists extends Component {
  constructor(props) {
    super(props);
    this.state = {
      favouriteArtists: this.props.userInSession.favouriteArtists,
      
    };
    this.service = new AuthService();
  }

  getAllEvents = () => {
    this.service.yourArtists().then(responseFromApi => {
      this.setState({
        ...this.state,
        favouriteArtists: responseFromApi
      });
    });
  };

  componentDidMount() {
    this.getAllEvents();
  }

  render() {
    return (
      <div className="my-top-artists">
        <div className="my-top-artists-title">
          <img src="https://res.cloudinary.com/dpi75nntc/image/upload/v1583946914/Group_4_ssn5jc.png" ></img>
        </div>
        <div className='imgs-container'>
        {this.state.favouriteArtists ? this.state.favouriteArtists.map(artist => (
          <Link to={`/artist-events/${artist.name}`}>
          <div  className='artist-name'>
          <div style={{backgroundImage:'url(' + artist.images[0].url + ')'}} className='img-artist'>
          </div>
        <p>{artist.name}</p>
        </div>
        </Link>
        )):null}
        </div>
      </div>
    );
  }
}

export default TopArtists;
