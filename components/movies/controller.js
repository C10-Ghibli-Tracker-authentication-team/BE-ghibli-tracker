const store = require('./store');


async function addMovie(movie){
    try{
        return await store.addMovie(movie)
    }catch(error){
        throw new Error('No se pudieron obtener los datos')
    }
}

async function listMovies(){
    try{
        return await store.getMovies()
    }catch(error){
        throw new Error('No se pudieron obtener los datos')
    }
}

function addScore(user, score, movie) {
    
    const fullRate = {
        user: user,
        score: score,
        movie: movie,
        date: new Date()
    };

    console.log(fullRate);
}

function deleteScore(user, score, movie) {
    const fullRate = {
        user: user,
        score: score,
        movie: movie,
        date: new Date()
    };

    console.log(fullRate);
}

module.exports = {
    listMovies,
    addMovie,
    addScore,
    deleteScore,
};