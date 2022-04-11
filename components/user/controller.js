const store = require('./store');
const jsonwebtoken = require('jsonwebtoken');
require('dotenv').config();
const bcrypt = require('bcrypt')

async function addUser(user) {
    try {
        if (!user.userName || !user.password) {
            throw ('No se ingresaron los datos correctos')
        }

        const findUser = await store.getUser(user)

        if (findUser) {
            throw ('Este usuario ya existe')
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
        throw (error)
    }
}

async function findUser(user){
    try{
        if(!user.userName || !user.password){
            throw ('No se ingresaron los datos correctos')
        }

        const userFind = await store.getUser(user)

        if(!userFind){
            throw ('Este usuario no existe')
        }

        const valid = await bcrypt.compare(user.password, userFind.password)

        if(!valid){
            throw ('Contraseña incorrecta')
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
        throw('Datos incorrectos')
    }
}

async function updateUser(user, password, profilePic){
    try{
       
        if(!profilePic && !password){
            throw ('No se ingresaron los datos correctos')
        }

        if(profilePic){
            var profilePicUrl = 'http://localhost:3000/app/files/' + profilePic.filename
        }

        const data = {
            profilePic: profilePicUrl ? profilePicUrl : profilePic,
            password: password ? await bcrypt.hash(password, 10) : password
        }

        const updatedUser = await store.updateUser(user, data)
        const token = jsonwebtoken.sign(
            {
                _id: updatedUser._id,
                userName: updatedUser.userName,
                profilePic: updatedUser.profilePic
            },
            process.env.JWT_SECRET,
            { expiresIn: '365d' }
        )
        return userToken = { token }      
    }catch{
        console.log(error)
        throw ('Datos incorrectos')
    }
}

module.exports = {
    addUser,
    findUser,
    updateUser
};