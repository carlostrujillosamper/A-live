import React, { Component } from "react";
import "./App.css";
import { Switch, Route, Redirect, withRouter } from "react-router-dom";

// import ProjectList from './components/projects/ProjectList';
import Navbar from "./components/navbar/Navbar";
// import ProjectDetails from './components/projects/ProjectDetails';
import SignUp from "./components/auth/SignUp";
import Login from "./components/auth/Login";
import AuthService from "./components/auth/AuthService";
import Contents from "./components/contents/Contents";
import Profile from "./components/auth/Profile";
import TopArtists from "./components/auth/TopArtists";
import Card from "./components/auth/TopArtists";
import ArtistEvents from "./components/auth/ArtistEvents";
import EventParties from "./components/auth/EventParties";
import OtherUserTopArtist from "./components/auth/OtherUserTopArtist";
import Chat from "./components/auth/Chat";
import LandingPage from "./components/landingPage";
//App es la aplicación base, que se sirve del servicio AuthService para conectar con la bbdd
class App extends Component {
  //en el tiempo de construcción de la aplicación, creamos una instancia del authservice
  constructor(props) {
    super(props);
    //arrancamos el estado con un valor de loggedInUser con nada (luego lo vamos a reemplazar con el valor real)
    this.state = { loggedInUser: null };
    this.service = new AuthService();
  }

  getUser = userObj => {
    this.setState({
      loggedInUser: userObj
    });
  };

  logout = () => {
    this.service.logout().then(() => {
      this.setState({ loggedInUser: null });
      this.props.history.push("/");
    });
  };
  componentDidMount() {
    this.fetchUser();
  }

  //este método vuelca la información del usuario y lo guarda en el state de app que siempre puedes revisitar
  fetchUser() {
    if (this.state.loggedInUser === null) {
      //utilizamos el método loggedin para cualquier momento que deseemos obtener la información del usuario quede guardada en el state de app
      return this.service
        .loggedin()
        .then(response => {
          this.setState({
            loggedInUser: response
          });
        })
        .catch(err => {
          this.setState({
            loggedInUser: false
          });
        });
    }
  }

  render() {
    console.log(this.state);
    // this.fetchUser();

    //aqui hacemos rendering condicional dependiendo de si tenemos un usuario logeado o no
    if (this.state.loggedInUser) {
      //en este caso mostramos los contenidos ya que hay usuario
      return (
        <React.Fragment>

          <div className="App">
            <header className="App-header">
              <Navbar
                userInSession={this.state.loggedInUser}
                logout={this.logout}
              />

              {/* aqui simplemente se muestra un lorem ipsum genérico para que veáis contenidos que solo se muestran a usuarios logeados */}

              <Route
                exact
                path="/topartists"
                render={() => (
                  <TopArtists userInSession={this.state.loggedInUser} />
                )}
              />
              <Route
                exact
                path="/artist-events/:keyword"
                // render={() => <ArtistEvents />}
                component={ArtistEvents}
              />
              <Route
                exact
                path="/otheruser-topartist/:userName"
                // render={() => <ArtistEvents />}
                component={OtherUserTopArtist}
              />
              <Route
                exact
                path="/chat"
                // render={() => <ArtistEvents />}
                component={Chat}
              />
              <Route
                exact
                path="/event-parties/:eventId"
                // render={() => <ArtistEvents />}
                component={EventParties}
              />
            </header>
          </div>
        </React.Fragment>
      );
    } else {
      //si no estás logeado, mostrar opcionalmente o login o signup
      return (
        <React.Fragment>
          <div className="App">
            <LandingPage></LandingPage>
          </div>
        </React.Fragment>
      );
    }
  }
}

export default withRouter(App);
