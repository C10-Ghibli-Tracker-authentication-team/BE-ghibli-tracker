const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const scoreSchema = new Schema({
  movieId: {
    type: Schema.ObjectId,
    ref: 'Movies'
  },
  emojiScores : [{
    userId: {
      type: Schema.ObjectId,
      ref: 'User',
    },
    score: {
      type: Number,
      required: true,
    }
  }],
  totalEmojiScore: Number,
  cantEmojiScore: Number
})


const model = mongoose.model('EmojiScore', scoreSchema);
module.exports = model;