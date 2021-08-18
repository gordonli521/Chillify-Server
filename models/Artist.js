const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ArtistSchema = new Schema({
    name: {
        type: String
    },
    playlists: [{
        type: Schema.Types.ObjectId,
        ref: 'Playlist'
    }],
    popularSongs: [{
        type: Schema.Types.ObjectId,
        ref: 'Song'
    }]
})

const Artist = mongoose.model('Artist', ArtistSchema);
module.exports = Artist;