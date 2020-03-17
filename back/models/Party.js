const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const userSchema = new Schema({
eventId : String,
artist : String,
picture: String,
name : String,
date : String,
country : String,
city : String,
venue : String,
address : String,
members :[{ type: Schema.Types.ObjectId, ref: "User" }],

}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

const Party = mongoose.model('Party', userSchema);
module.exports = Party;