const Model = require('./model')


async function addScore(starScore, user) {
  //Creando objeto Score
  const newScore = {
    'userId': user._id,
    'score': starScore.score,
  }

  try {
    //Existe un score para esta pelicula y usuario
    const findScore = await Model.exists({
      'movieId': starScore.movieId,
      'starScores': { $elemMatch: { userId: newScore.userId } }
    });
    //Actualiza el score para esta pelicula y usuario si ya existe
    if (findScore) {     
      await Model.updateOne(
        {
          'movieId': starScore.movieId,
          'starScores': { $elemMatch: { userId: newScore.userId } }
        },
        {
          $set: {
            "starScores.$.score": newScore.score,
          },
        },
        {new: true}
      )
    }
    //Crea un nuevo score para esta pelicula si no existe
    else {
      await Model.updateOne({
        'movieId': starScore.movieId
        },
        {
          $push:{
            starScores : {
              ...newScore
            }
          },
          $inc: {
            cantStarScore: 1
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