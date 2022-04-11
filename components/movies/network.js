const express = require('express');
const response = require('../../network/response');
const controller = require('./controller')

const router = express.Router();

router.post('/', async function(req, res){
    console.log(req.body.title);
    try{
        await controller.addMovie(req.body)
        response.success(req, res, req.body, 201)
    }catch(error){
        response.error(req, res, error, 400)
    }
});

router.get('/', async function(req, res) {
    try{
        const moviesList = await controller.listMovies()
        response.success(req, res, moviesList, 200);
    }catch(error){
        response.error(req,res, error, 400)
    }
});

module.exports = router;