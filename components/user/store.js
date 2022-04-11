const Model = require('./model')
const bcrypt = require('bcrypt')

async function addUser({ userName, password }) {
  try {
    const profilePic = `${process.env.HOST}:${process.env.PORT}/app/files/default_image.jpeg`

    const user = {
      userName,
      password: await bcrypt.hash(password, 10),
      profilePic
    }

    const newUser = new Model(user)
    return newUser.save()
  } catch (error) {
    console.log(error)
    throw new Error('Unexpected error')
  }
}

async function getUser({ userName }) {
  try {
    return await Model.findOne({ userName: userName }).exec()
  } catch (error) {
    console.log(error)
    throw new Error('Unexpected error')
  }
}

async function updateUser(user, data){

  const updatedUser = await Model.findOneAndUpdate(
    {
      '_id': user._id,
    },
    {
      $set: data,
    },
    {new: true}
  )

  return updatedUser;
}

module.exports = {
  addUser,
  getUser, 
  updateUser
}