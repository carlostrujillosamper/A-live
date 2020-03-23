import React, { Component } from "react";
import { Map, GoogleApiWrapper, Marker } from "google-maps-react";

const styles = {
  width: "100%",
  height: "35%"
};

export class MapContainer extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Map
        google={this.props.google}
        zoom={10}
        style={styles}
        initialCenter={{
          lat: `${this.props.lat}`,
          lng: `${this.props.lng}`
        }}
      >
        <Marker
        />
      </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: process.env.REACT_APP_GOOGLE_KEY
})(MapContainer);
