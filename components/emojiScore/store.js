const Model = require('./model')


async function addScore(emojiScore) {
  try {

    const findScore = await Model.exists({
      'movieId': emojiScore.movieId,
      'emojiScores': { $elemMatch: { userId: emojiScore.emojiScores.userId } }
    });
    if (findScore) {     
      await Model.updateOne(
        {
          'movieId': emojiScore.movieId,
          'emojiScores': { $elemMatch: { userId: emojiScore.emojiScores.userId } }
        },
        {
          $set: {
            "emojiScores.$.score": emojiScore.emojiScores.score,
          },
        }
      )
    } else {
      const newScore = await Model.updateOne({
        'movieId': emojiScore.movieId
        },
        {
          $push:{
            emojiScores: {
              userId:emojiScore.emojiScores.userId,
              score: emojiScore.emojiScores.score,
            }
          },
          $inc: {
            cantEmojiScore: 1
          }
        },
      {
        new:true,
        upsert:true
      })
      console.log(newScore)
    }

  } catch (error) {
    console.log(error)
    throw new Error('Unexpected error')
  }
}


module.exports = {
  addScore
}