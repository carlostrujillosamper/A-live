const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const userSchema = new Schema({
  username: String,
  password: String,
  email:String,
  spotifyId:String,
  token:String,
  refreshToken:String,
  photo:String,
  country:String,
  favouriteArtists:[],
  chatToken : String,
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

const User = mongoose.model('User', userSchema);
module.exports = User;
