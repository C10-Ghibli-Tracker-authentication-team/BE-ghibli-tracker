const store = require('./store');


async function addEmojiScore(score){
    try{
        return await store.addScore(score)
    }catch(error){
        throw ('No se pudieron obtener los datos')
    }
}

module.exports = {
  addEmojiScore,
};