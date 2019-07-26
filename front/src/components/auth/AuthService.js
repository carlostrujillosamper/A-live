import axios from 'axios';

class AuthService {
  constructor() {
    this.service = axios.create({
      baseURL: 'http://localhost:5000/auth',
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
}


export default AuthService;
