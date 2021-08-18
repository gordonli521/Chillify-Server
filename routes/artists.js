var express = require("express");
var router = express.Router();
const db = require("../models");

// GET artist listing.
router.get("/", function (req, res, next) {
  db.Artist.find(function (err, artist) {
    if (err) {
      console.log(err);
    } else {
      res.json(artist);
    }
  });
});

// GET: uses name to get an artist
router.get("/:name", (req, res) => {
  let name = req.params.name;
  db.Artist.findOne({ name: name }, (err, artist) => {
    return res.json(artist);
  });
});

// GET: uses name to get an artist's playlists
router.get("/:name/playlists", (req, res) => {
  let name = req.params.name;
  db.Playlist.find({ artist: name }, (err, artist) => {
    return res.json(artist);
  });
});

// GET: uses name and title to get artist playlist
router.get("/:name/playlist/:title", (req, res) => {
  let name = req.params.name;
  let title = req.params.title;
  db.Playlist.find({ artist: name, title: title }, (err, artist) => {
    return res.json(artist);
  });
});

module.exports = router;
