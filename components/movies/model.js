const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const movieSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  originalTitle: {
    type: String,
    required: true,
  },
  originalTitleRomanised: String,
  imageUrl:  {
    type: String,
    required: true,
  },
  director: {
    type: String,
    required: true,
  },
  producer: {
    type: String,
    required: true,
  },
  runningTime: {
    type: String,
    required: true,
  },
  rtScore: {
    type: String,
    required: true,
  },
  wikiUrl: {
    type: String,
    required: true,
  },
  releaseDate: {
    type: String,
    required: true,
  }
});

const model = mongoose.model('Movies', movieSchema);
module.exports = model;
