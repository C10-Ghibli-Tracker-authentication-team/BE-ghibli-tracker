const jsonwebtoken = require('jsonwebtoken');
const response = require('../network/response');

async function authenticate(req, res, next) {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]

  if (!token) {
    return response.error(req, res, 'No se pudo autenticar', 400, 'Token no enviado')
  }
  
  let userFind = ""
  try{
    userFind =  jsonwebtoken.verify(token, process.env.JWT_SECRET)
  }catch(error){
    return response.error(req, res, 'No se pudo autenticar', 400, 'Error interno al autenticar')
  }
  
  if(!userFind._id){
    return response.error(req, res, 'No se pudo autenticar', 400, 'El _id no se encuentra en el token')
  }
  
  req.user = userFind;
  next();
}

module.exports = authenticate;