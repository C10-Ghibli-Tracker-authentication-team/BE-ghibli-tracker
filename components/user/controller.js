const store = require('./store');
const jsonwebtoken = require('jsonwebtoken');
require('dotenv').config();
const bcrypt = require('bcrypt')

async function addUser(user) {
    try {
        if (!user.userName || !user.password) {
            throw new Error('No se ingresaron los datos correctos')
        }

        const findUser = await store.getUser(user)

        if (findUser) {
            throw new Error('Este usuario ya existe')
        }

        const newUser = await store.addUser(user)

        const token = jsonwebtoken.sign(
            {
                _id: newUser._id,
                userName: newUser.userName,
                profilePic: newUser.profilePic
            },
            process.env.JWT_SECRET,
            { expiresIn: '365d' }
        )

        return data = { token }
    } catch (error) {
        console.log(error)
        throw new Error('Datos incorrectos')
    }
}

async function findUser(user){
    try{
        if(!user.userName || !user.password){
            throw new Error('No se ingresaron los datos correctos')
        }

        const userFind = await store.getUser(user)

        if(!userFind){
            throw new Error('Este usuario no existe')
        }

        const valid = await bcrypt.compare(user.password, userFind.password)

        if(!valid){
            throw new Error('Contraseña incorrecta')
        }

        const token = jsonwebtoken.sign(
            {
                _id: userFind._id,
                userName: userFind.userName,
                profilePic: userFind.profilePic
            },
            process.env.JWT_SECRET,
            { expiresIn: '365d' }
        )

        return data = { token }
    }catch(error){
        console.log(error)
        throw new Error('Datos incorrectos')
    }
}

module.exports = {
    addUser,
    findUser
};