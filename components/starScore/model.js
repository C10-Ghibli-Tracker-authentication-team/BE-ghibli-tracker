const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const scoreSchema = new Schema({
  movieId: {
    type: Schema.ObjectId,
    ref: 'Movies'
  },
  starScores : [{
    userId: {
      type: Schema.ObjectId,
      ref: 'User',
    },
    score: {
      type: Number,
      required: true,
    }
  }],
  cantStarScore: Number
})


const model = mongoose.model('StarScore', scoreSchema);
module.exports = model;