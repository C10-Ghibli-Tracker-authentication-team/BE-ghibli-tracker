const express = require('express');
const multer = require('multer');
const response = require('../../network/response');
const controller = require('./controller');
const auth = express.Router();
const user = express.Router();
const passport = require('passport');
const upload = multer({
    dest: 'public/files/'
})


auth.get('/auth/facebook', passport.authenticate('facebook'));

auth.get('/auth/facebook/callback',
  passport.authenticate('facebook', { session: false, scope:['public_profile', 'email'] }),
  async function(req, res) {
   try{
    response.success(req, res, req.user)
   }catch(error){
    response.error(req, res, `${error}`, 500)
   }    
});

auth.post('/signup', async function (req, res) {
    try {
        const data = await controller.addUser(req.body)
        response.success(req, res, data, 201)
    } catch (error) {
        response.error(req, res, `${error}`, 500)
    }
})

auth.post('/login', async function (req, res) {
    try {
        const data = await controller.findUser(req.body)
        response.success(req, res, data, 200)
    } catch (error) {
        response.error(req, res, `${error}`, 500)
    }
})

user.patch('/update',upload.single('profilePic'), async function(req, res){
    try{
        const data = await controller.updateUser(req.user, req.body.password, req.file)
        response.success(req, res, data, 200)
    }catch(error){
        response.error(req, res, `${error}`, 500)
    }
})

module.exports = {
    user,
    auth
};