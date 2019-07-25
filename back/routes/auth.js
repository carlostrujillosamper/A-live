const express = require("express");
const passport = require('passport');
const SpotifyStrategy = require('passport-spotify').Strategy;
const axios = require("axios");

const router = express.Router();
const User = require("../models/User");


// Bcrypt to encrypt passwords
const bcrypt = require("bcrypt");
const bcryptSalt = 10;


// router.get("/userData", (req, res) => {
//   let user = JSON.parse(JSON.stringify(req.user))
//   // delete user.password
//   // delete user.__v
//   // res.json(req.user);
//   res.status(200).json(user)
// });
router.get("/currentUser", (req, res) => {
  // let user = JSON.parse(JSON.stringify(req.user))
  // delete user.password
  // delete user.__v
  // res.json(req.user);
  res.status(200).json(req.user)
});


passport.use(
  new SpotifyStrategy(
    {
      clientID: process.env.ClientID,
      clientSecret:process.env.ClientSecret ,
      callbackURL: 'http://localhost:5000/auth/login/spotify/callback',
      passReqToCallback: true
    },
    
    function(req,accessToken,refreshToken,profile,done){
      console.log(profile)

      User.findOne({
        spotifyId: profile.id
        
          },function(err,user){
           
          if(err){
              done(err);
          }
          if(user){
              req.login(user,function(err){
                  if(err){
                      return next(err);
                  }
                  return done(null,user);
              });
          }else{
              let newUser = new User({
                spotifyId: profile.id,
                username: profile.displayName,
                token: accessToken,
                refreshToken: refreshToken,
                photo:profile.photos[0],
                country:profile.country
              });
              newUser.save(function(err){
                  if(err){
                      throw(err);
                  }
                  req.login(newUser,function(err){
                      if(err){
                          return next(err);
                      }
                      return done(null,newUser);
                  });
              });
          }
      });
  }
)
)
passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});
router.get('/myTopArtists', (req, res)=> {
  
  getMyTopArtists(req.user.token)
  
  // res.render('auth/profile', { user: req.user });
  // res.json(getMyTopArtists(req.user.token))
  // res.status(200).json(getMyTopArtists(req.user.token))
  res.json()
});

function getMyTopArtists(token){

axios.get("https://api.spotify.com/v1/me/top/artists",{headers: {Authorization: `Bearer ${token}`}})
.then(axiosresponse=>{
axiosresponse.data.items.map((artist)=>{
  console.log(artist.name)
})
})
.catch(err=> console.log(err))
}

function getAllConcerts(artists){
  axios.get(`https://app.ticketmaster.com/discovery/v2/events.json?keyword=${artists}&size=1&sort=date,asc&apikey=eHV9YEef21RiqpNGWGJB1C3rIY16C62y`)
 
  .then(responseFromApi => {
    console.log(responseFromApi.data._embedded.events[0].name)
    console.log(responseFromApi.data._embedded.events[0].dates.start.localDate)
    console.log(responseFromApi.data._embedded.events[0]._embedded.venues[0].name)
    
  })
   .catch(err=>console.log(err))
}


router.get("/login", (req, res, next) => {
  res.render("auth/login", { "message": req.flash("error") });
});

router.post(
  "/login/spotify",
  passport.authenticate('spotify', {
    scope: ['user-read-email', 'user-read-private','user-top-read'],
    showDialog: true
  }),
  function(req, res,next) {

    
 
  }
);

router.get(
  '/login/spotify/callback',
  passport.authenticate('spotify', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.   

    console.log(req.user)
    res.redirect("http://localhost:3000/profile");
  }
);

router.get("/signup", (req, res, next) => {
  res.render("auth/signup");
});

router.post("/signup", (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;
  if (username === "" || password === "") {
    res.render("auth/signup", { message: "Indicate username and password" });
    return;
  }

  User.findOne({ username }, "username", (err, user) => {
    if (user !== null) {
      res.render("auth/signup", { message: "The username already exists" });
      return;
    }

    const salt = bcrypt.genSaltSync(bcryptSalt);
    const hashPass = bcrypt.hashSync(password, salt);

    const newUser = new User({
      username,
      password: hashPass
    });

    newUser.save()
    .then(() => {
      res.redirect("/");
    })
    .catch(err => {
      res.render("auth/signup", { message: "Something went wrong" });
    })
  });
});

router.get('/loggedin', (req, res, next) => {
  if (req.user) {
    res.status(200).json(req.user);
  } else {
    next(new Error('Not logged in'))
  }
})

router.get("/logout", (req, res) => {
  req.logout();
  res.status(200).json({ message: 'logged out' });
});


module.exports = router;

