const Model = require('./model')

async function hasEmojiScore(emojiScore, user) {
  try {
    const findScore = await Model.exists({
      'movieId': emojiScore.movieId,
      'emojiScores': { $elemMatch: { userId: user._id } }
    });
    return findScore;
  } catch (error) {
    console.log(error)
    throw ('Unexpected error')
  }
}

async function addNewScore(emojiScore, user) {

  const newScore = {
    'userId': user._id,
    'score': emojiScore.score,
  }

  try {
    await Model.updateOne({
      'movieId': emojiScore.movieId
    },
      {
        $push: {
          emojiScores: {
            ...newScore
          }
        },
        $inc: {
          cantEmojiScore: 1
        }
      },
      {
        new: true,
        upsert: true
      })
  } catch (error) {
    console.log(error)
    throw ('Unexpected error')
  }

  return newScore;
}

async function updateScore(emojiScore, user) {
  const newScore = {
    'userId': user._id,
    'score': emojiScore.score,
  }
  try {
    await Model.updateOne(
      {
        'movieId': emojiScore.movieId,
        'emojiScores': { $elemMatch: { userId: newScore.userId } }
      },
      {
        $set: {
          "emojiScores.$.score": newScore.score,
        },
      },
      { new: true }
    )
  } catch (error) {
    console.log(error)
    throw ('Unexpected error')
  }
}

async function getScoreByUser(movieID, userID) {
  try{
    const score = await Model.findOne({ movieId: movieID }).select({ emojiScores: { $elemMatch: { userId: userID } } })
    if(score){
      return score.emojiScores[0].score
    }
    return 0
  }catch(error){
    console.log(error)
    throw ('Unexpected error')
  }
  
}

module.exports = {
  hasEmojiScore,
  addNewScore,
  updateScore,
  getScoreByUser
}