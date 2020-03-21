import React, { Component } from "react";
import AuthService from "./AuthService";
import { Link } from "react-router-dom";

export default class Discover extends Component {
  constructor() {
    super();
    this.state = {
      searchValue: undefined,
      searchResults: [],
      loaded: false,
      trendingEvents: []
    };

    this.service = new AuthService();
  }

  handleChange(e) {
    this.setState({ ...this.state, searchValue: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();

    if (this.state.searchValue) {
      this.service
        .artistEvents(this.state.searchValue)
        .then(response =>
          this.setState({
            ...this.state,
            searchResults: response,
            loaded: true
          })
        )
        .catch(err => console.log(err));
    }
  }

  componentDidMount() {
    this.service
      .trendingEvents()
      .then(response =>
        this.setState({ ...this.state, trendingEvents: response })
      )
      .catch(err => console.log(err));
  }

  render() {
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
          <div className='title-container'>
          <p>Trending Events</p>
          </div>
          <hr></hr>
          <div className="event-card-container">
            {this.state.trendingEvents.map((event, idx) => (
              <Link
                className="link-to-details"
                to={`/event-details/${event.artist}/${event.eventId}`}
              >
                <div
                  className="event-card"
                  style={{
                    backgroundImage: `linear-gradient(rgba(0,0,0,0.8), rgba(0,0,0,0.8)),  url("${event.picture}")`
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
            ))}
          </div>
        </div>
      </div>
    );
  }
}
