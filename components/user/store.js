const Model = require('./model')

async function addUser(user) {
  try {
    const newUser = new Model(user)
    newUser.save()
  } catch (error) {
    console.log(error)
    throw new Error('Unexpected error')
  }
}

async function getUser(idUser){
  try {
    return await Model.findById(idUser)
  } catch(error){
    console.log(error)
    throw new Error('Unexpected error')
  }
}

module.exports = {
  addUser,
  getUser
}