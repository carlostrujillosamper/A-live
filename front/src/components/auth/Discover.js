import React, { Component } from "react";
import AuthService from "./AuthService";
import { Link } from "react-router-dom";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";

export default class Discover extends Component {
  constructor() {
    super();
    this.state = {
      trendingEvents: [],
      trendingArtists:[]
    };

    this.service = new AuthService();
  }


  getTrendingEvents(){
    this.service
    .trendingEvents()
    .then(response =>
      this.setState({ ...this.state, trendingEvents: response })
    )
    .catch(err => console.log(err));

  }
  getTrendingArtists(){
    this.service
    .trendingArtists()
    .then(response =>
      this.setState({ ...this.state, trendingArtists: [... new Set([...response])] })
    )
    .catch(err => console.log(err));

  }

  componentDidMount() {
    this.getTrendingEvents()
    this.getTrendingArtists()
  }

  render() {
    console.log(this.state.trendingArtists);
    return (
      <div className="discover-screen">

        <div className="trending-events">
          <div className="title-container">
            <h4>Trending Events</h4>
          </div>
          <hr></hr>
          <div className="event-card-slider">
            <Carousel
              showThumbs={false}
              showIndicators={false}
              showStatus={false}
              infiniteLoop={true}
            >
              {this.state.trendingEvents.map((event, idx) => (
                <div>
                  <img></img>
                  <Link
                    className="link-to-details"
                    to={`/event-details/${event.artist}/${event.eventId}`}
                  >
                    <div
                      className="event-card"
                      style={{
                        backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)),  url("${event.picture}")`
                      }}
                    >
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
               </div>
              ))}
            </Carousel>
          </div>
        </div>
        <div className="trending-events">
          <div className="title-container">
            <h4>Trending Artist</h4>
          </div>
          <hr></hr>
          <div className="event-card-slider-artists">
            <Carousel
              showThumbs={false}
              showIndicators={false}
              showStatus={false}
              infiniteLoop={true}
            >
              {this.state.trendingArtists.map((artist, idx) => (
                <div>
                  <img></img>
                  <Link
                    className="link-to-details"
                    to={`/artist-events/${artist.name}`}
                  >
                    <div
                      className="event-card"
                      style={{
                        backgroundImage: `url("${artist.images[0].url}")`
                      }}
                    >
                      <h3>{artist.name}</h3>
                      <div className="fav-num-container">
                      </div>
                    </div>
                  </Link>
               </div>
              ))}
            </Carousel>
          </div>
        </div>

      </div>
    );
  }
}
