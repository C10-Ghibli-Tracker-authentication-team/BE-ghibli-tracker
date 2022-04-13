const store = require('./store');


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

module.exports = {
    listMovies,
    addMovie,
};