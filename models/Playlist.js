const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PlaylistSchema = new Schema({
  title: {
    type: String,
  },
  year: {
    type: String,
  },
  artist: {
    type: String,
  },
  songs: [
    {
      type: Schema.Types.ObjectId,
      ref: "Song",
    },
  ],
  image: {
    type: String,
  },
  plays: {
    type: String,
  },
});

const Playlist = mongoose.model("Playlist", PlaylistSchema);
module.exports = Playlist;
