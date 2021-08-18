var express = require("express");
var router = express.Router();
const db = require("../models");

/* GET song listing. */
router.get("/", function (req, res, next) {
  db.Song.find(function (err, song) {
    if (err) {
      console.log(err);
    } else {
      res.json(song);
    }
  });
});

// GET: use id to get a specific song
router.get("/:id", function (req, res) {
  let id = req.params.id;
  db.Song.findById(id, (err, song) => {
    return res.json(song);
  });
});

//PUT: increments a song's plays and its playlist's plays
router.put("/:id", function (req, res) {
  let id = req.params.id;
  db.Song.findById(id, (err, songData) => {
    if (err) {
      throw err;
    } else if (songData) {
      let incrementedSongPlays = parseInt(songData.plays, 10) + 1;
      songData.plays = incrementedSongPlays.toString();
      songData.save().then((result, err) => {
        if (err) {
          console.log(err);
        }
        res.status(200).json({ msg: "increment song plays success" });
      });
      db.Playlist.findOne({ title: songData.playlist }, (err, playlistData) => {
        if (err) {
          throw err;
        } else {
          let incrementPlaylistPlays = parseInt(playlistData.plays, 10) + 1;
          playlistData.plays = incrementPlaylistPlays.toString();
          playlistData.save().then((result, err) => {
            if (err) {
              console.log(err);
            }
            res.status(200).json({ msg: "increment playlist plays success" });
          });
        }
      });
    } else {
      res.status(400).json("no id in request body");
    }
  });
});

module.exports = router;
