import React, { Component } from "react";
import AuthService from "./AuthService";
import axios from "axios";
import { Link } from "react-router-dom";
import EventMap from "./Event-Map";

export default class EventParties extends Component {
  constructor(props) {
    super(props);
    this.state = {
      eventDetails: [],
      isLoading: true,
      eventParties: [],
      favourited: false,
      userInSession: this.props.userInSession
    };
    this.service = new AuthService();
  }
  addNewParty() {
    const { params } = this.props.match;
    const selectedArtistPic = this.state.userInSession.favouriteArtists.find(
      artist => artist.name === this.props.match.params.artist
    );

    this.service
      .addParties(
        params.eventId,
        selectedArtistPic.images[0].url,
        this.props.match.params.artist,
        this.state.eventDetails.name,
        this.state.eventDetails.dates.start.localDate,
        this.state.eventDetails._embedded.venues[0].markets[0].name,
        this.state.eventDetails._embedded.venues[0].city.name,
        this.state.eventDetails._embedded.venues[0].name,
        this.state.eventDetails._embedded.venues[0].address.line1
      )

      .then(favouritedParty =>
        this.setState({ ...this.state, favourited: true })
      );
  }

  eraseFromFavs() {
    const { params } = this.props.match;

    this.service
      .eraseFromFavs(params.eventId)
      .then(unfavouritedParty =>
        this.setState({ ...this.state, favourited: false })
      );
  }

  getEventParties = () => {
    const { params } = this.props.match;
    this.service
      .eventParties(params.eventId)
      .then(responseFromApi => {
        console.log(responseFromApi);
        this.setState({
          eventDetails: responseFromApi.data,
          favourited: responseFromApi.favourited,
          isLoading: false
        });
      })
      .catch(err => {
        console.log(err);
      });
  };
  getUserParties = () => {
    this.service
      .userParties(this.props.match.params.eventId)
      .then(responseFromApi => {
        this.setState({
          eventParties: responseFromApi
        });
      });
  };

  componentDidMount() {
    this.getEventParties();
    // this.getUserParties();
  }
  render() {
    console.log(this.state.userInSession);
    return (
      <React.Fragment>
        {!this.state.isLoading ? (
          <React.Fragment>
            {/* <div  className="map-container">
              <EventMap
                lat={
                  this.state.eventDetails._embedded.venues[0].location.latitude
                }
                lng={
                  this.state.eventDetails._embedded.venues[0].location.longitude
                }
              ></EventMap>
            </div>
            <div className="event-detail-title">
              <h3>{this.props.match.params.artist}</h3>
              <hr></hr>
              <div  className="event-detail-info">
                <p>{this.state.eventDetails.name}</p>
                <p>{this.state.eventDetails.dates.start.localDate}</p>
                <p>
                  {this.state.eventDetails._embedded.venues[0].markets[0].name}/
                  {this.state.eventDetails._embedded.venues[0].city.name}
                </p>
                <p>
                  {this.state.eventDetails._embedded.venues[0].name}-
                  {this.state.eventDetails._embedded.venues[0].address.line1}
                </p>
              </div>
            </div> */}
            <div className="fav-ticket-container">
              {this.state.favourited ? (
                <div className="fav-icon-container-fav">
                  <i
                    onClick={() => this.eraseFromFavs()}
                    className="fa fa-star"
                    aria-hidden="true"
                  ></i>
                </div>
              ) : (
                <div
                  onClick={() => this.addNewParty()}
                  className="fav-icon-container-nonfav"
                >
                  <i className="fa fa-star-o" aria-hidden="true"></i>
                </div>
              )}

              <a href={this.state.eventDetails.url}>
                <button type="button">Get tickets</button>
              </a>
            </div>
          </React.Fragment>
        ) : (
          <h2>Loading</h2>
        )}
      </React.Fragment>
    );
  }
}
