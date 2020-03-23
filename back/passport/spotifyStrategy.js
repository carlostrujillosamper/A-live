const passport      = require('passport');
const User          = require('../models/User');
const SpotifyStrategy = require("passport-spotify").Strategy;

passport.use(
    new SpotifyStrategy(
      {
        clientID: process.env.ClientID,
        clientSecret: process.env.ClientSecret,
        callbackURL: `https://a-live-demo.herokuapp.com/auth/login/spotify/callback`,
        // callbackURL: `http://localhost:5000/auth/login/spotify/callback`,
        passReqToCallback: true
      },
  
      function(req, accessToken, refreshToken, profile, done) {
        User.findOne(
          {
            spotifyId: profile.id
          },
          function(err, user) {
            if (err) {
              done(err);
            }
            if (user) {
              req.login(user, function(err) {
                if (err) {
                  return next(err);
                }
                return done(null, user);
              });
            } else {
              let newUser = new User({
                spotifyId: profile.id,
                username: profile.displayName,
                token: accessToken,
                refreshToken: refreshToken,
                photo: profile.photos[0],
                country: profile.country,
                favouriteArtists: [],
              });
              newUser.save(function(err) {
                if (err) {
                  throw err;
                }
                req.login(newUser, function(err) {
                  if (err) {
                    return next(err);
                  }
                  return done(null, newUser);
                });
              });
            }
          }
        );
      }
    )
  );
  