import React, { Component } from 'react'
import AuthService from './AuthService';
import axios from 'axios';

export default class EventParties extends Component {
  constructor(props){
    super(props);
    this.state = { eventDetails: [], isLoading:true, eventParties:[] };
    this.service = new AuthService()
}
addNewParty(e) {
  const  {params}  = this.props.match;

   
      // axios.post("http://localhost:5000/auth/add-party" ,{"eventId":params.eventId})
      this.service.addParties(params.eventId)  
      
          .then(addedParty => {
            let clonedPartiesArray = [...this.state.eventParties]
            clonedPartiesArray.push(addedParty)
              this.setState({
                  ...this.state,
                  eventParties : clonedPartiesArray,
                  
              })
          })

  
}



  getEventParties = () => {
    const  {params}  = this.props.match;
    this.service.eventParties(params.eventId)
    .then( responseFromApi =>{
        this.setState({
          eventDetails:responseFromApi,
          isLoading:false
        });
    })
    .catch((err)=>{
        console.log(err)
    })
}
  getUserParties = () =>{
    console.log(this.props.match.params.eventId)
    // const  {params}  = this.props.match;

    this.service.userParties(this.props.match.params.eventId)
    .then(responseFromApi =>{
      this.setState({
        eventParties : responseFromApi
      })
    })
  }

  componentDidMount() {
    this.getEventParties();
    this.getUserParties();

  }
  render() {
    return (
      <React.Fragment>
      {!this.state.isLoading ? 

        (
          
          <div style={{backgroundImage:'url(' + this.state.eventDetails.images[1].url + ')'}}  className="card-header-event">
          <h2>{this.state.eventDetails.dates.start.localDate}</h2>
          <h2>{this.state.eventDetails.name}</h2>
          <h2>{this.state.eventDetails._embedded.venues[0].markets[0].name}/{this.state.eventDetails._embedded.venues[0].city.name}</h2>
          <h2>{this.state.eventDetails._embedded.venues[0].name}-{this.state.eventDetails._embedded.venues[0].address.line1}</h2>
          <a  href={this.state.eventDetails.url}>Buy tickets</a>
          <h2 style={{cursor:"pointer"}} onClick={(e) => this.addNewParty(e)}>Create Party</h2>
          {this.state.eventParties.map(party=>{
            return(
              <h2>{party.createdBy}</h2>

            )
          })}

          </div>
          
          
        )
        :<h2>Loading</h2>}
        </React.Fragment>
    )
 
  }
}
