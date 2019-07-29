const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const userSchema = new Schema({
eventId : String,
members :[{ type: Schema.Types.ObjectId, ref: "User" }],
createdBy : String,


}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

const Party = mongoose.model('Party', userSchema);
module.exports = Party;