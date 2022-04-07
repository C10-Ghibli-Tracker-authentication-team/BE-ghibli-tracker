const Model = require('./model')


async function addMovie(movie) {
  try {
    const newMovie = new Model(movie)
    newMovie.save()
  } catch (error) {
    console.log(error)
    throw new Error('Unexpected error')
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
      $addFields : {
        "totalEmojiScore": {
          $sum: "$emojiScores.score"
        }
      }
    },
    {$project:
      {
        emojiscore:0,
        emojiScores:0,
        movieId:0,
        __v:0,
      }
    }
    ])
  } catch (error) {
    throw new Error('Unexpected error')
  }
}


module.exports = {
  addMovie,
  getMovies
}