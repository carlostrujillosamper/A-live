import React, { Component } from 'react'

export default class test extends Component {
    getArtistEvents = () => {
        const { params } = this.props.match;
        const arr = [];
        // console.log(this.props)
        this.service
          .artistEvents(params.keyword)
          .then(responseFromApi => {
            this.setState({
              artistEvents: responseFromApi,
              isLoading: false
            });
          })
          .then(() => {
            this.state.artistEvents.map(event => {
              return this.service
                .userParties(event.id)
                .then(responseFromApi => {
                  console.log(responseFromApi.length);
                  arr.push(responseFromApi.length);
                  // if(responseFromApi)
                  // arr.push(responseFromApi);
                  this.setState({
                    ...this.state,
                    members: arr
                  });
                })
                .catch(err => console.log(err));
            });
          })
          .catch(err => {
            console.log(err);
          });
      };
    
    render() {
        return (
            <div>
                <div className="event-list">
{!this.state.isLoading ? (
  this.state.artistEvents.map((event, idx) => {
    // console.log(idx)s
    return (
      <React.Fragment>
        <div className="card-event" key={idx}>
          <header
            style={{
              backgroundImage: "url(" + event.images[0].url + ")"
            }}
            className="card-header"
          >
            <h4 className="card-header--title"> </h4>
          </header>
          <div className="card-body">
            <p className="date-event">
              {event.dates.start.localDate}
            </p>
            {/* <Link to={`/event-parties/${event.id}`}>
              <h2>{event.name}</h2>
            </Link> */}
            <p className="body-content">
              {event._embedded.venues.city} ||{" "}
              {event._embedded.venues.name} ||{" "}
              {event._embedded.venues[0].address.line1}\\\\\\\\\\\
              {/* {this.state.members[idx]} */}
              
            </p>
            {this.state.members[idx] ? <p className="people-going">{this.state.members[idx]} are going</p> :<p className="people-not-going"> No people going yet</p>}
          </div>
        </div>
      </React.Fragment>
    );
  })
) : (
  
  <h3>{this.state.isLoading}</h3>
)}
</div>
            </div>
        )
    }
}
