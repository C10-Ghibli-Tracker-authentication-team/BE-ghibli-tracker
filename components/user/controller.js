const store = require('./store');
const jsonwebtoken = require('jsonwebtoken');
require('dotenv').config();
const bcrypt = require('bcrypt')

async function addUser(newUser) {
    try {
        if (!newUser.userName || !newUser.password) {
            throw ('No se ingresaron los datos correctos')
        }

        const findUser = await store.getUser(newUser)

        if (findUser) {
            throw ('Este usuario ya existe')
        }

        const user = await store.addUser(newUser)
        delete user._doc.password
        const token = jsonwebtoken.sign(
            {
                _id: user._id,
            },
            process.env.JWT_SECRET,
            { expiresIn: '2d' }
        )

        return data = { user, token }
    } catch (error) {
        console.log(error)
        throw (error)
    }
}

async function findUser(userFind){
    try{
        if(!userFind.userName || !userFind.password){
            throw ('No se ingresaron los datos correctos')
        }

        let user = await store.getUser(userFind)

        if(!user){
            throw ('Este usuario no existe')
        }

        const valid = await bcrypt.compare(userFind.password, user.password)
        
        if(!valid){
            throw ('Datos incorrectos')
        }
        delete user._doc.password
        const token = jsonwebtoken.sign(
            {
                _id: user._id,
            },
            process.env.JWT_SECRET,
            { expiresIn: '2d' }
        )

        return data = { user, token }
    }catch(error){
        console.log(error)
        throw('Datos incorrectos')
    }
}

async function updateUser(updatedUser, password, profilePic){
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

        const user = await store.updateUser(updatedUser, data)
        delete user._doc.password
        return userToken = { user }      
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