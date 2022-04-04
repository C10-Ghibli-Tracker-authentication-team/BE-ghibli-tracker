

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
    addScore,
    deleteScore,
};