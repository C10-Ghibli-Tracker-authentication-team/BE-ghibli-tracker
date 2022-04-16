const store = require('./store');
const userStore = require('../user/store');
const model = require('./model');

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

        var actualMovie = await store.getMovieById(movieID);
        actualMovie = actualMovie._doc
        return {
            ...actualMovie,
            watched: watchedMovies.includes(movieID)
        }
    }catch(error){
        throw ('No se pudieron obtener los datos')
    }
}

module.exports = {
    listMovies,
    addMovie,
    likeMovie
};