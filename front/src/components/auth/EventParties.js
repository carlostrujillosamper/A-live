import React, { Component } from 'react'
import AuthService from './AuthService';

export default class EventParties extends Component {
  constructor(props){
    super(props);
    this.state = { eventDetails: [], isLoading:true };
    this.service = new AuthService()
}


  getEventParties = () => {
    const  {params}  = this.props.match;
    this.service.eventParties(params.eventId)
    .then( responseFromApi =>{
      console.log(responseFromApi)
        this.setState({
          eventDetails:responseFromApi,
          isLoading:false
        });
    })
    .catch((err)=>{
        console.log(err)
    })
}

  componentDidMount() {
    this.getEventParties();
  }
  render() {
    return (
      <div>
      {!this.state.isLoading ? 

        (
          
          <div style={{backgroundImage:'url(' + this.state.eventDetails.images[1].url + ')'}}  className="card-header-event">
          <h2>{this.state.eventDetails.dates.start.localDate}</h2>
          <h2>{this.state.eventDetails.name}</h2>
          <h2>{this.state.eventDetails._embedded.venues[0].markets[0].name}/{this.state.eventDetails._embedded.venues[0].city.name}</h2>
          <h2>{this.state.eventDetails._embedded.venues[0].name}-{this.state.eventDetails._embedded.venues[0].address.line1}</h2>
          <a href={this.state.eventDetails.url}>Buy tickets</a>

          </div>
          
          
        )
        :<h2>Loading</h2>}
        </div>
    )
 
  }
}
