const express = require("express");
const passport = require("passport");
// const SpotifyStrategy = require("passport-spotify").Strategy;
const axios = require("axios");

const router = express.Router();
const User = require("../models/User");
const Party = require("../models/Party");
// const bcrypt = require("bcrypt");
// const bcryptSalt = 10;

router.get("/currentUser", (req, res) => {
  // getMyTopArtists()

  res.status(200).json(req.user);
});

router.get("/yourArtists", (req, res) => {
  // console.log(req.user)

  res.json(req.user.favouriteArtists);
});
router.get("/otheruser-topartist/:userName", (req, res) => {
  console.log(req.params.userName);
  User.findOne({ username: req.params.userName }).then(foundUser =>
    // console.log(foundUser)
    res.json(foundUser.favouriteArtists)
  );
});
router.get("/add-toyourartist", (req, res) => {
  console.log(req.params.userName);
  User.findOneAndUpdate({ username: req.user.username }).then(foundUser =>
    // console.log(foundUser)
    res.json(foundUser.favouriteArtists)
  );
});

router.get("/getmyTopArtists", (req, res) => {
  axios
    .get("https://api.spotify.com/v1/me/top/artists", {
      headers: { Authorization: `Bearer ${req.user.token}` }
    })
    .then(axiosresponse => {
      User.findOneAndUpdate(
        { spotifyId: req.user.spotifyId },
        { $unset: { favouriteArtists: "" } },
        { new: true }
      )
        .then(user => {
          User.findOneAndUpdate(
            { spotifyId: req.user.spotifyId },
            { $addToSet: { favouriteArtists: axiosresponse.data.items } },
            { new: true }
          )
            .then(user => {
              res.json(user.favouriteArtists);
            })
            .catch(err => {
              console.log(err);
            });
        })
        .catch(err => {
          console.log(err);
        });
    })
    .catch(err => console.log(err));
});

router.post("/add-to-top", (req, res) => {
  User.findOneAndUpdate(
    { spotifyId: req.user.spotifyId },
    { $push: { favouriteArtists: req.body.artist } },
    { new: true }
  ).then(foundUser => {
    console.log(foundUser);
  });
});

router.get("/artist-events/:keyword", (req, res, next) => {
  let actualArtistResults = []
  axios
    .get(
      `https://app.ticketmaster.com/discovery/v2/events.json?keyword=${req.params.keyword}&sort=date,asc&apikey=eHV9YEef21RiqpNGWGJB1C3rIY16C62y`
    )
    .then(responseFromApi => {
      
      responseFromApi.data._embedded.events.forEach(event=>{
        if(event._embedded.attractions[0].name.toLowerCase()===req.params.keyword.toLowerCase()) {
          actualArtistResults.push(event)
        }
        res.json(actualArtistResults);
      })
    })
    .catch(err => console.log(err));
});

router.get("/event-parties/:eventId", (req, res, next) => {
  Party.findOne({
    $and: [{ members: req.user._id, eventId: req.params.eventId }]
  }).then(foundParty => {
    if (foundParty) {
      console.log(foundParty);

      axios
        .get(
          `https://app.ticketmaster.com/discovery/v2/events/${req.params.eventId}.json?apikey=eHV9YEef21RiqpNGWGJB1C3rIY16C62y`
        )

        .then(responseFromApi => {
          res.json({ data: responseFromApi.data, favourited: true });
        })
        .catch(err => console.log(err));
    } else {
      console.log("not found");
      axios
        .get(
          `https://app.ticketmaster.com/discovery/v2/events/${req.params.eventId}.json?apikey=eHV9YEef21RiqpNGWGJB1C3rIY16C62y`
        )

        .then(responseFromApi => {
          res.json({ data: responseFromApi.data, favourited: false });
        })
        .catch(err => console.log(err));
    }
  });
});
router.post("/add-party", (req, res) => {
  console.log("hola");
  const {
    eventId,
    picture,
    artist,
    name,
    date,
    country,
    city,
    venue,
    address
  } = req.body;

  Party.findOne({ eventId }).then(addedParty => {
    if (addedParty) {
      Party.findByIdAndUpdate(
        addedParty._id,
        { $addToSet: { members: req.user._id } },
        { new: true }
      ).then(updatedParty => res.json(updatedParty));
    } else {
      Party.create({
        eventId,
        picture,
        artist,
        name,
        date,
        country,
        city,
        venue,
        address,
        members: [req.user._id]
      }).then(addedParty => [res.json(addedParty)]);
    }
  });
});

router.post("/erase-from-favs", (req, res) => {
  console.log(req.body.eventId);
  Party.findOneAndUpdate(
    { eventId: req.body.eventId },
    { $unset: { members: req.user._id } },
    { new: true }
  ).then(updatedParty => res.json(updatedParty));
});

router.get("/my-events", (req, res) => {
  Party.find({ members: req.user._id })
    .then(foundEvents => {
      res.json(foundEvents);
    })
    .catch(err => console.log(err));
});

router.get("/user-parties/:eventId", (req, res) => {
  console.log(req.params.eventId);

  Party.find({ eventId: req.params.eventId })
    .then(eventParties => [res.json(eventParties)])
    .catch(err => console.log(err));
});

router.get("/login", (req, res, next) => {
  res.render("auth/login", { message: req.flash("error") });
});

router.get('/trending-events',(req,res)=>{
  Party.find().sort({"members":-1})
  .then(trendingEvents=>res.json(trendingEvents))
  .catch(err=>console.log(err))
})

router.get(
  "/login/spotify",
  passport.authenticate("spotify", {
    scope: ["user-read-email", "user-read-private", "user-top-read"],
    showDialog: true
  }),
  function(req, res, next) {}
);

router.get(
  "/login/spotify/callback",
  passport.authenticate("spotify", { failureRedirect: "/login" }),
  function(req, res) {
    // Successful authentication, redirect home.

    res.redirect("http://localhost:3000/topartists");
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

    newUser
      .save()
      .then(() => {
        res.redirect("/");
      })
      .catch(err => {
        res.render("auth/signup", { message: "Something went wrong" });
      });
  });
});

router.get("/loggedin", (req, res, next) => {
  if (req.user) {
    res.status(200).json(req.user);
  } else {
    next(new Error("Not logged in"));
  }
});

router.get("/logout", (req, res) => {
  req.logout();
  res.status(200).json({ message: "logged out" });
});

module.exports = router;
