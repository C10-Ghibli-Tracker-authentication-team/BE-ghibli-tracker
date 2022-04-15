const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  userName: {
    type: String,
    required: true,
    unique: true
  },
  password:{
    type: String,
  }, 
  profilePic: String,
  watchedMovies: [{
    type: Schema.ObjectId,
    ref: 'Movies'
  }]
})

const model = mongoose.model('Users', userSchema);
module.exports = model;
