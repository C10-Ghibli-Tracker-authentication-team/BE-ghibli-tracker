const mongoose = requrie('mongoose');
const Schema = mongoose.Schema;

const scoreSchema = new Schema({
  movieId: {
    type: Schema.ObjectId,
    ref: 'Movies'
  },
  scores : [{
    userId: {
      type: Schema.ObjectId,
      ref: 'User',
    },
    score: {
      type: String,
      required: true,
    }
  }],
  totalScore: String,
})


const model = mongoose.model('StarScore', scoreSchema);
module.exports = model;