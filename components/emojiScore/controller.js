const store = require('./store');


async function addEmojiScore(score, user){
    try{
        return await store.addScore(score, user)
    }catch(error){
        throw ('No se pudieron obtener los datos')
    }
}

module.exports = {
  addEmojiScore,
};