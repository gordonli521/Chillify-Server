var express = require('express');
var router = express.Router();
const db = require('../models');

/* GET playlists listing. */
router.get('/', function(req, res, next) {
  db.Playlist.find(function(err, playlist) {
		if(err) {
			console.log(err);
		}
		else {
			res.json(playlist);
		}
	});
});

// GET: uses id to get a playlist
router.get('/:id', (req, res) => {
  let id = req.params.id;
  db.Playlist.findById(id, (err, playlist) => {
    return res.json(playlist);
  })
})

module.exports = router;
