(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{36:function(e,t,n){e.exports=n(64)},41:function(e,t,n){},42:function(e,t,n){},64:function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),s=n(32),c=n.n(s),i=(n(41),n(1)),l=n(2),o=n(4),u=n(3),m=n(5),h=(n(42),n(12)),d=n(14),v=n(7),g=n(13),p=n.n(g),f=function e(){var t=this;Object(i.a)(this,e),this.signup=function(e,n){return t.service.post("/signup",{username:e,password:n}).then(function(e){return e.data})},this.login=function(){return t.service.post("/login/spotify").then(function(e){return e.data})},this.loggedin=function(){return t.service.get("/currentUser").then(function(e){return e.data})},this.logout=function(){return t.service.get("/logout").then(function(e){return e.data})},this.yourArtists=function(){return t.service.get("/yourArtists").then(function(e){return e.data})},this.artistEvents=function(e){return t.service.get("/artist-events/".concat(e)).then(function(e){return e.data})},this.eventParties=function(e){return t.service.get("/event-parties/".concat(e)).then(function(e){return e.data})},this.addParties=function(e){return t.service.post("/add-party",{eventId:e}).then(function(e){return e.data})},this.userParties=function(e){return t.service.get("/user-parties/".concat(e)).then(function(e){return e.data})},this.service=p.a.create({baseURL:"\u200bhttps://a-live.herokuapp.com",withCredentials:!0})},E=function(e){function t(e){var n;return Object(i.a)(this,t),(n=Object(o.a)(this,Object(u.a)(t).call(this,e))).handleLogout=function(e){n.props.logout()},n.state={loggedInUser:null},n.service=new f,n}return Object(m.a)(t,e),Object(l.a)(t,[{key:"componentWillReceiveProps",value:function(e){this.setState(Object(d.a)({},this.state,{loggedInUser:e.userInSession}))}},{key:"render",value:function(){return this.state.loggedInUser?r.a.createElement("nav",{className:"nav-style"},r.a.createElement("ul",null,r.a.createElement("li",{onClick:this.handleLogout},"Logout"),r.a.createElement("li",null,r.a.createElement(v.b,{to:"/topartists"},"TopArtists"))),r.a.createElement("h2",null,r.a.createElement("img",{className:"profile-pic",src:this.state.loggedInUser.photo}),this.state.loggedInUser.username," ")):r.a.createElement("div",null,r.a.createElement("nav",{className:"nav-style"},r.a.createElement("ul",null,r.a.createElement("li",null,r.a.createElement(v.b,{to:"/signup"},"Signup")),r.a.createElement("li",null,r.a.createElement(v.b,{to:"/login"},"Login")),r.a.createElement("li",null,r.a.createElement(v.b,{to:"/profile"},"Profile")))))}}]),t}(a.Component),b=n(15),y=function(e){function t(e){var n;return Object(i.a)(this,t),(n=Object(o.a)(this,Object(u.a)(t).call(this,e))).handleFormSubmit=function(e){e.preventDefault();var t=n.state.username,a=n.state.password;n.service.signup(t,a).then(function(e){n.setState({username:"",password:""}),n.props.getUser(e.user)}).catch(function(e){n.setState({username:t,password:a,error:!0})})},n.handleChange=function(e){var t=e.target,a=t.name,r=t.value;n.setState(Object(b.a)({},a,r))},n.state={username:"",password:""},n.service=new f,n}return Object(m.a)(t,e),Object(l.a)(t,[{key:"render",value:function(){var e=this;return r.a.createElement("div",null,r.a.createElement("h3",null,"Welcome!, create your account next:"),r.a.createElement("form",{onSubmit:this.handleFormSubmit},r.a.createElement("fieldset",null,r.a.createElement("label",null,"Username:"),r.a.createElement("input",{type:"text",name:"username",value:this.state.username,onChange:function(t){return e.handleChange(t)}})),r.a.createElement("fieldset",null,r.a.createElement("label",null,"Password:"),r.a.createElement("input",{type:"password",name:"password",value:this.state.password,onChange:function(t){return e.handleChange(t)}})),r.a.createElement("input",{type:"submit",value:"Sign up"})),r.a.createElement("h1",null,this.state.error?"Error":""))}}]),t}(a.Component),j=function(e){function t(e){var n;return Object(i.a)(this,t),(n=Object(o.a)(this,Object(u.a)(t).call(this,e))).handleFormSubmit=function(e){e.preventDefault();var t=n.state.username,a=n.state.password;n.service.login().then(function(e){console.log(e)}).catch(function(e){n.setState({username:t,password:a,error:!0})})},n.handleChange=function(e){var t=e.target,a=t.name,r=t.value;n.setState(Object(b.a)({},a,r))},n.state={username:"",password:""},n.service=new f,n}return Object(m.a)(t,e),Object(l.a)(t,[{key:"render",value:function(){return r.a.createElement("div",null,r.a.createElement("h3",null,"Please, login to our site"),r.a.createElement("a",{href:"".concat("\u200bhttps://a-live.herokuapp.com","/login/spotify")},"login"),r.a.createElement("h1",null,this.state.error?"Error":""))}}]),t}(a.Component),O=(a.Component,function(e){function t(){var e;return Object(i.a)(this,t),(e=Object(o.a)(this,Object(u.a)(t).call(this))).getUser=function(){p.a.get("https://a-live.herokuapp.com/auth/userData",{headers:{"Content-Type":"application/json","Access-Control-Allow-Origin":"*"}}).then(function(e){console.log(e)}).catch(function(e){return console.log(e)})},e.state={user:{}},e}return Object(m.a)(t,e),Object(l.a)(t,[{key:"componentDidMount",value:function(){this.getUser()}},{key:"render",value:function(){return r.a.createElement("div",null,r.a.createElement("div",{style:{width:"60%",float:"left"}},r.a.createElement("h2",null,this.state.user.username)))}}]),t}(a.Component)),w=function(e){function t(e){var n;return Object(i.a)(this,t),(n=Object(o.a)(this,Object(u.a)(t).call(this,e))).getAllEvents=function(){n.service.yourArtists().then(function(e){n.setState({favouriteArtist:e.splice(1,e.length),isLoading:!1})})},n.state={favouriteArtist:[],isLoading:!0},n.service=new f,n}return Object(m.a)(t,e),Object(l.a)(t,[{key:"componentDidMount",value:function(){this.getAllEvents()}},{key:"render",value:function(){return r.a.createElement("div",null,r.a.createElement("div",{className:"card-list"},this.state.isLoading?r.a.createElement("h3",null,"Loading..."):this.state.favouriteArtist.map(function(e){return r.a.createElement("div",{className:"card"},r.a.createElement("header",{style:{backgroundImage:"url("+e.images[0].url+")"},className:"card-header"},r.a.createElement("h4",{className:"card-header--title"}," ")),r.a.createElement("div",{className:"card-body"},r.a.createElement("p",{className:"date"},"Followers ",e.followers.total),r.a.createElement("h2",null,e.name),r.a.createElement("p",{className:"body-content"},e.genres[0]," || ",e.genres[1]),r.a.createElement(k,{artist:e})))})))}}]),t}(a.Component),k=function(e){function t(){return Object(i.a)(this,t),Object(o.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(m.a)(t,e),Object(l.a)(t,[{key:"render",value:function(){return r.a.createElement(v.b,{to:"/artist-events/".concat(this.props.artist.name)},r.a.createElement("button",{className:"button button-primary"},r.a.createElement("i",{className:"fa fa-chevron-right"})," Find events"))}}]),t}(r.a.Component),U=function(e){function t(e){var n;return Object(i.a)(this,t),(n=Object(o.a)(this,Object(u.a)(t).call(this,e))).getArtistEvents=function(){var e=n.props.match.params,t=[];n.service.artistEvents(e.keyword).then(function(e){n.setState({artistEvents:e,isLoading:!1})}).then(function(){n.state.artistEvents.map(function(e){return n.service.userParties(e.id).then(function(e){console.log(e.length),t.push(e.length),n.setState(Object(d.a)({},n.state,{members:t}))}).catch(function(e){return console.log(e)})})}).catch(function(e){console.log(e)})},n.state={artistEvents:[],isLoading:!0,members:new Array(10).fill().map(function(e,t){return t})},n.service=new f,n}return Object(m.a)(t,e),Object(l.a)(t,[{key:"componentDidMount",value:function(){this.getArtistEvents()}},{key:"render",value:function(){var e=this;return console.log(this.state.members),r.a.createElement("div",null,r.a.createElement("div",{className:"event-list"},this.state.isLoading?r.a.createElement("h3",null,this.state.isLoading):this.state.artistEvents.map(function(t,n){return r.a.createElement(r.a.Fragment,null,r.a.createElement("div",{className:"card-event",key:n},r.a.createElement("header",{style:{backgroundImage:"url("+t.images[0].url+")"},className:"card-header"},r.a.createElement("h4",{className:"card-header--title"}," ")),r.a.createElement("div",{className:"card-body"},r.a.createElement("p",{className:"date-event"},t.dates.start.localDate),r.a.createElement(v.b,{to:"/event-parties/".concat(t.id)},r.a.createElement("h2",null,t.name)),r.a.createElement("p",{className:"body-content"},t._embedded.venues.city," ||"," ",t._embedded.venues.name," ||"," ",t._embedded.venues[0].address.line1,"\\\\\\\\\\\\\\\\\\\\\\"),e.state.members[n]?r.a.createElement("p",{className:"people-going"},e.state.members[n]," are going"):r.a.createElement("p",{className:"people-not-going"}," No people going yet"))))})))}}]),t}(a.Component),N=n(35),I=function(e){function t(e){var n;return Object(i.a)(this,t),(n=Object(o.a)(this,Object(u.a)(t).call(this,e))).getEventParties=function(){var e=n.props.match.params;n.service.eventParties(e.eventId).then(function(e){n.setState({eventDetails:e,isLoading:!1})}).catch(function(e){console.log(e)})},n.getUserParties=function(){console.log(n.props.match.params.eventId),n.service.userParties(n.props.match.params.eventId).then(function(e){n.setState({eventParties:e})})},n.state={eventDetails:[],isLoading:!0,eventParties:[]},n.service=new f,n}return Object(m.a)(t,e),Object(l.a)(t,[{key:"addNewParty",value:function(e){var t=this,n=this.props.match.params;this.service.addParties(n.eventId).then(function(e){var n=Object(N.a)(t.state.eventParties);n.push(e),t.setState(Object(d.a)({},t.state,{eventParties:n}))})}},{key:"componentDidMount",value:function(){this.getEventParties(),this.getUserParties()}},{key:"render",value:function(){var e=this;return r.a.createElement(r.a.Fragment,null,this.state.isLoading?r.a.createElement("h2",null,"Loading"):r.a.createElement(r.a.Fragment,null,r.a.createElement("div",{style:{backgroundImage:"url("+this.state.eventDetails.images[1].url+")"},className:"card-header-event"},r.a.createElement("h2",null,this.state.eventDetails.dates.start.localDate),r.a.createElement("h2",null,this.state.eventDetails.name),r.a.createElement("h2",null,this.state.eventDetails._embedded.venues[0].markets[0].name,"/",this.state.eventDetails._embedded.venues[0].city.name),r.a.createElement("h2",null,this.state.eventDetails._embedded.venues[0].name,"-",this.state.eventDetails._embedded.venues[0].address.line1),r.a.createElement("a",{href:this.state.eventDetails.url},"Buy tickets"),r.a.createElement("h2",{style:{cursor:"pointer"},onClick:function(t){return e.addNewParty(t)}},"I'm going"),this.state.eventParties.map(function(e){return r.a.createElement("h2",null,e.createdBy)}))))}}]),t}(a.Component),S=function(e){function t(e){var n;return Object(i.a)(this,t),(n=Object(o.a)(this,Object(u.a)(t).call(this,e))).getUser=function(e){n.setState({loggedInUser:e})},n.logout=function(){n.service.logout().then(function(){n.setState({loggedInUser:null}),n.props.history.push("/")})},n.state={loggedInUser:null},n.service=new f,n}return Object(m.a)(t,e),Object(l.a)(t,[{key:"componentDidMount",value:function(){this.fetchUser()}},{key:"fetchUser",value:function(){var e=this;if(null===this.state.loggedInUser)return this.service.loggedin().then(function(t){e.setState({loggedInUser:t})}).catch(function(t){e.setState({loggedInUser:!1})})}},{key:"render",value:function(){var e=this;return this.fetchUser(),this.state.loggedInUser?r.a.createElement(r.a.Fragment,null,r.a.createElement("div",{className:"App"},r.a.createElement("header",{className:"App-header"},r.a.createElement(E,{userInSession:this.state.loggedInUser,logout:this.logout}),r.a.createElement(h.a,{exact:!0,path:"/topartists",render:function(){return r.a.createElement(w,null)}}),r.a.createElement(h.a,{exact:!0,path:"/artist-events/:keyword",component:U}),r.a.createElement(h.a,{exact:!0,path:"/event-parties/:eventId",component:I})))):r.a.createElement(r.a.Fragment,null,r.a.createElement("div",{className:"App"},r.a.createElement("header",{className:"App-header"},r.a.createElement(E,{userInSession:this.state.loggedInUser,logout:this.logout}),r.a.createElement(h.c,null,r.a.createElement(h.a,{exact:!0,path:"/profile",render:function(){return r.a.createElement(O,null)}}),r.a.createElement(h.a,{exact:!0,path:"/signup",render:function(){return r.a.createElement(y,{getUser:e.getUser})}}),r.a.createElement(h.a,{exact:!0,path:"/login",render:function(){return r.a.createElement(j,{getUser:e.getUser})}})))))}}]),t}(a.Component),P=Object(h.f)(S);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));c.a.render(r.a.createElement(v.a,null,r.a.createElement(P,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})}},[[36,1,2]]]);
//# sourceMappingURL=main.4a52df58.chunk.js.map