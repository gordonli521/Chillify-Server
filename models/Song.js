const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SongSchema = new Schema({
  artist: {
    type: String,
  },
  playlist: {
    type: String,
  },
  title: {
    type: String,
  },
  url: {
    type: String,
  },
  plays: {
    type: String,
  },
  duration: {
    type: String,
  },
});

const Song = mongoose.model("Song", SongSchema);
module.exports = Song;
