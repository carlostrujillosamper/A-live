
import axios from 'axios';


class AuthService {
  constructor() {
    this.service = axios.create({
      baseURL: process.env.REACT_APP_URL,
      withCredentials: true
    });
  }

  signup = (username, password) => {
    return this.service.post('/signup', {username, password})
    .then(response => response.data)
  }

  login = () => {
    return this.service.post('/login/spotify' )
    .then(response => response.data)
  }

  loggedin = () => {
    return this.service.get('/currentUser',)
    .then(response => response.data)
  }

  logout = () => {
    return this.service.get('/logout',)
    .then(response => response.data)
  }

  yourArtists = () =>{
    return this.service.get('/yourArtists')
    .then(response => response.data)
  }
 

artistEvents = (keyword) =>{
  return this.service.get(`/artist-events/${keyword}`)
  .then(response => response.data)
}

eventParties = (eventId) =>{
  return this.service.get(`/event-parties/${eventId}`)
  .then(response => response.data)
}

addParties = (eventId) =>{
  return this.service.post(`/add-party`,{eventId})
  .then(response => response.data)

}
userParties = (eventId) =>{
  return this.service.get(`/user-parties/${eventId}`)
  .then(response => response.data)

}
otherUserTopArtist = (userName) =>{
  return this.service.get(`/otheruser-topartist/${userName}`)
  .then(response => response.data)

}
addToTop = (artist)=>{
  return this.service.post('/add-to-top',{artist})
  .then(response=>response.data)
}

}



export default AuthService;
