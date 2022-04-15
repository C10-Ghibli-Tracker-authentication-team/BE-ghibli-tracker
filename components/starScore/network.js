const express = require('express');
const response = require('../../network/response')
const controller = require("./controller")
const router = express.Router();

router.post('/', async function(req, res){
  try{
    const score = await controller.addStarScore(req.body, req.user)
    response.success(req, res,score, 201)
  }catch(error){
      response.error(req, res, error, 400)
  }
})

module.exports = router;