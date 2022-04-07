const store = require('./store');

async function addUser(user){
    try{
        if(!user.userName || !user.password){
            throw new Error('No se ingresaron los datos correctos')
        }
        return await store.addUser(user)
    }catch(error){
        console.log(error)
        throw new Error('Datos incorrectos')
    }
}

module.exports = {
    addUser,
};