const store = require('./store');
const movieStore = require('../movies/store')
const userStore = require('../user/store');
const starStore = require('../starScore/store');

async function addEmojiScore(score, user){
    try{
        const movie = await movieStore.existMovie(score.movieId)
        if(!movie){
            throw (`No se encontro una pelicula con este id  ${movieID}`)
        };
        const hasStarScore = await store.hasStarScore(score,user)
        if(hasStarScore){
            await store.updateScore(score,user)
        } else{
            await store.addNewScore(score, user)
        };

        const userFind = await userStore.getUserById(user._id);
        const watchedMovies = userFind.watchedMovies;
   
        const scoreStarFind = await starStore.getScoreByUser(score.movieId,user._id) 
        const scoreEmojiFind = await store.getScoreByUser(score.movieId,user._id)     

        const actualMovie = await movieStore.getMovieById(score.movieId);

        return {
            ...actualMovie,
            watched: watchedMovies.includes(score.movieId),
            starScore: scoreStarFind,
            emojiScore: scoreEmojiFind
        }
    }catch(error){
        console.log(error)
        throw ('No se pudieron obtener los datos')
    }
}

module.exports = {
  addEmojiScore,
};