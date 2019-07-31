import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import AuthService from './AuthService';

class OtherUserTopArtist extends Component {
  constructor(props){
      super(props);
      this.state = { favouriteArtist: [], isLoading:true };
      this.service = new AuthService()
  }

  getAllEvents = () =>{
    
    const  {params}  = this.props.match;
   this.service.otherUserTopArtist(params.userName)
    .then(responseFromApi => {
     
      
      this.setState({
        favouriteArtist: responseFromApi.splice(1,responseFromApi.length),
        isLoading: false

      })

      
    })
  }

  componentDidMount() {
    this.getAllEvents();
  }

  render(){
    return(
      <div>
        
        
        <div className="card-list">

          
       
            {!this.state.isLoading ? this.state.favouriteArtist.map(artist=>{
              return (
                
                <div className="card">

      <header style={{backgroundImage:'url(' + artist.images[0].url + ')'}}  className="card-header">
        <h4 className="card-header--title"> </h4>
      </header>
      <div className="card-body">
        <p className="date">Followers {artist.followers.total}</p>
        
        <h2>{artist.name}</h2>
        
        <p className="body-content">{artist.genres[0]} || {artist.genres[1]}</p>
        <p onClick> ADD TO YOUR TOP ARTIST</p>
        {/* <Button artist={artist}/> */}
      </div>
              </div>
             
                )
            }):<h3>Loading...</h3>}
 
          
        </div>
      </div>
      // <h2>hola</h2>
      
    )
  }
}

export default OtherUserTopArtist;


// class Button extends React.Component {
//   render() {
//     return (
//       <Link to={`/artist-events/${this.props.artist.name}`}>

//       <button className="button button-primary">
//         <i className="fa fa-chevron-right"></i> Find events
//       </button>
//       </Link>
//     )
//   }
// }
