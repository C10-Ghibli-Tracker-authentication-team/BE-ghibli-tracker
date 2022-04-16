const store = require('./store');
const userStore = require('../user/store');
const starStore = require('../starScore/store');
const emojiStore = require('../emojiScore/store');

async function addMovie(movie){
    try{
        return await store.addMovie(movie)
    }catch(error){
        throw ('No se pudieron obtener los datos')
    }
}

async function listMovies(){
    try{
        return await store.getMovies()
    }catch(error){
        throw ('No se pudieron obtener los datos')
    }
}

async function likeMovie(userID,movieID){
    try{
        const movie = await store.existMovie(movieID)
        if(!movie){
            throw (`No se encontro una pelicula con este id  ${movieID}`)
        };
        const hasWatched = await userStore.hasWatched(userID, movieID)
        if(hasWatched){
            await userStore.removeWatched(userID, movieID)
        } else{
            await userStore.addWatched(userID, movieID)
        };

        const user = await userStore.getUserById(userID);
        const watchedMovies = user.watchedMovies;

        const scoreStarFind = await starStore.getScoreByUser(movieID,userID)     
        const scoreEmojiFind = await emojiStore.getScoreByUser(movieID,userID) 

        const actualMovie = await store.getMovieById(movieID);
        
        return {
            ...actualMovie,
            watched: watchedMovies.includes(movieID),
            starScore: scoreStarFind,
            emojiScore: scoreEmojiFind
        }
    }catch(error){
        throw ('No se pudieron obtener los datos')
    }
}

async function getMovie(userID,movieID){
    try{
        const actualMovie = await store.getMovieById(movieID)
        if(!actualMovie){
            throw (`No se encontro una pelicula con este id  ${movieID}`)
        };
        const user = await userStore.getUserById(userID);
        const watchedMovies = user.watchedMovies;

        const scoreStarFind = await starStore.getScoreByUser(movieID,userID)     
        const scoreEmojiFind = await emojiStore.getScoreByUser(movieID,userID) 

        return {
            ...actualMovie,
            watched: watchedMovies.includes(movieID),
            starScore: scoreStarFind,
            emojiScore: scoreEmojiFind
        }

    }catch(error){
        console.log(error)
        throw ('No se pudieron obtener los datos')
    }
}

module.exports = {
    listMovies,
    addMovie,
    likeMovie,
    getMovie
};