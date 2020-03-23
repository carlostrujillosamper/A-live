import React, { Component } from "react";
import { Link } from "react-router-dom";
import AuthService from "./AuthService";


export default class Search extends Component {
  constructor() {
    super();

    this.state = {
      searchValue: undefined,
      searchResults: [],
      loaded: false,
      finalArr : []
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
        .then(response => {

          response.forEach(event => {
            if (
              event._embedded.attractions[0] && event._embedded.attractions[0].name.toLowerCase() ===
              this.state.searchValue.toLowerCase()
            ) {
              console.log(event._embedded.attractions[0].name.toLowerCase());
              this.state.finalArr.push(event);
            }
          });
          this.setState({
            ...this.state,
            searchResults: this.state.finalArr,
            loaded: true
          });
        })
        .catch(err => console.log(err));
    }
  }

  render() {
    return (
      <div className="search-screen">
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
        {this.state.finalArr.length>0 ? (
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
                      backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)),  url("${event.images[0].url}")`
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
        ) : <p>No events where found for this artist</p>}
      </div>
    );
  }
}
