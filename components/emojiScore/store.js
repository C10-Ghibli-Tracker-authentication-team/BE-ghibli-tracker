const Model = require('./model')


async function addScore(emojiScore, user) {
  //Creando objeto Score
  const newScore = {
    'userId': user._id,
    'score': emojiScore.score,
  }

  try {
    //Existe un score para esta pelicula y usuario
    const findScore = await Model.exists({
      'movieId': emojiScore.movieId,
      'emojiScores': { $elemMatch: { userId: newScore.userId } }
    });
    console.log(findScore)
    //Actualiza el score para esta pelicula y usuario si ya existe
    if (findScore) {     
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
        {new: true}
      )
    }
    //Crea un nuevo score para esta pelicula si no existe
    else {
      await Model.updateOne({
        'movieId': emojiScore.movieId
        },
        {
          $push:{
            newScore
          },
          $inc: {
            cantEmojiScore: 1
          }
        },
      {
        new:true,
        upsert:true
      })
    }

    return newScore
  } catch (error) {
    throw ('Unexpected error')
  }
}


module.exports = {
  addScore
}