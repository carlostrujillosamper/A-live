import React, { Component } from "react";
import AuthService from "./AuthService";
import { Link } from "react-router-dom";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";

export default class Discover extends Component {
  constructor() {
    super();
    this.state = {
      searchValue: undefined,
      searchResults: [],
      loaded: false,
      trendingEvents: [],
      trendingArtists:[]
    };

    this.service = new AuthService();
  }

  handleChange(e) {
    this.setState({ ...this.state, searchValue: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    let finalArr = [];

    if (this.state.searchValue) {
      this.service
        .artistEvents(this.state.searchValue)
        .then(response => {
          response.forEach(event => {
            if (
              event._embedded.attractions[0].name.toLowerCase() ===
              this.state.searchValue.toLowerCase()
            ) {
              console.log(event._embedded.attractions[0].name.toLowerCase());
              finalArr.push(event);
            }
          });
          this.setState({
            ...this.state,
            searchResults: finalArr,
            loaded: true
          });
        })
        .catch(err => console.log(err));
    }
  }

  verifyResults(resultArr) {
    let finalArr = [];
    resultArr.forEach(event => {
      if (
        event._embedded.attractions[0].name.toLowerCase() ===
        this.state.searchValue.toLowerCase()
      ) {
        finalArr.push(event);
      }
    });
    return finalArr;
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
        <div className="search-bar">
          <form onSubmit={e => this.handleSubmit(e)}>
            <label>
              <button>
                <i class="fa fa-search" aria-hidden="true"></i>
              </button>

              <input
                type="text"
                name="search"
                value={this.state.searchValue}
                onChange={e => this.handleChange(e)}
                placeholder="Look for events"
              ></input>
            </label>
          </form>
        </div>
        {this.state.loaded ? (
          <div className="search-results">
            <div className="title-container">
              <p>Search results</p>
            </div>
            <hr></hr>

            <div className="event-card-container">
              {this.state.searchResults.map(event => (
                <Link
                  className="link-to-details"
                  to={`/event-details/${event._embedded.attractions[0].name}/${event.id}`}
                >
                  <div
                    className="event-card"
                    style={{
                      backgroundImage: `linear-gradient(rgba(0,0,0,0.8), rgba(0,0,0,0.8)),  url("${event.images[0].url}")`
                    }}
                  >
                    <h3>{event._embedded.attractions[0].name}</h3>
                    <p>{event.dates.start.localDate}</p>
                    <p>{event._embedded.venues[0].city.name}</p>
                    <p>{event._embedded.venues[0].name}</p>
                    <div className="fav-num-container">
                      <i className="fa fa-star-o" aria-hidden="true"></i>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        ) : null}

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
