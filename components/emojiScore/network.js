const express = require('express');
const response = require('../../network/response')
const controller = require("./controller")
const router = express.Router();

router.post('/', async function(req, res){
  try{
    await controller.addEmojiScore(req.body)
    response.success(req, res, req.body, 201)
  }catch(error){
      response.error(req, res, 'Unexpected Error', 400, error)
  }
})

module.exports = router;