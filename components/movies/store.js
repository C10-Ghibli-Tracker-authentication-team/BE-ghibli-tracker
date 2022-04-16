const Model = require('./model')

async function getMovieById(movieID) {
  try {
    const movie = await Model.findById(movieID);
    return movie._doc;
  } catch (error) {
    console.log(error)
    throw ('Unexpected error')
  }
}

async function existMovie(movieID) {
  try {
    const exist = await Model.exists({ '_id': movieID });
    return exist;
  } catch (error) {
    console.log(error)
    throw ('Unexpected error')
  }
}

async function addMovie(movie) {
  try {
    const newMovie = new Model(movie)
    newMovie.save()
  } catch (error) {
    console.log(error)
    throw ('Unexpected error')
  }
}

async function getMovies() {
  try {
    return await Model.aggregate([
      {
        $lookup: {
          from: 'starscores',
          localField: '_id',
          foreignField: 'movieId',
          as: 'starscore'
        }
      },
      {
        $replaceRoot: {
          newRoot:
          {
            $mergeObjects: [
              { $arrayElemAt: ['$starscore', 0] }, "$$ROOT"
            ]
          }
        }
      },
      {
        $lookup: {
          from: 'emojiscores',
          localField: '_id',
          foreignField: 'movieId',
          as: 'emojiscore'
        }
      },
      {
        $replaceRoot: {
          newRoot:
          {
            $mergeObjects: [
              { $arrayElemAt: ['$emojiscore', 0] }, "$$ROOT"
            ]
          }
        }
      },
      {
        $addFields: {
          "totalEmojiScore": {
            $sum: "$emojiScores.score"
          },
          "totalStarScore": {
            $sum: "$starScores.score"
          }
        }
      },
      {
        $project:
        {
          emojiscore: 0,
          emojiScores: 0,
          movieId: 0,
          __v: 0,
          starscore: 0,
          starScores: 0,

        }
      }
    ])
  } catch (error) {
    throw ('Unexpected error')
  }
}


module.exports = {
  addMovie,
  getMovieById,
  getMovies,
  existMovie
}