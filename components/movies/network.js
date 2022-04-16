const express = require('express');
const response = require('../../network/response');
const controller = require('./controller')

const router = express.Router();

router.post('/', async function(req, res){
    try{
        await controller.addMovie(req.body)
        response.success(req, res, req.body, 201)
    }catch(error){
        response.error(req, res, error, 400)
    }
});

router.get('/:id', async function(req, res) {
    try{
        const movieList = await controller.getMovie(req.user._id,req.params.id)
        response.success(req, res, movieList, 200);
    }catch(error){
        response.error(req,res, error, 400)
    }
});

router.get('/', async function(req, res) {
    try{
        const movieList = await controller.listMovies()
        response.success(req, res, movieList, 200);
    }catch(error){
        response.error(req,res, error, 400)
    }
});

router.post('/likeMovie', async function(req, res){
    try{
        const movie = await controller.likeMovie(req.user._id,req.body.movieId)
        response.success(req, res, movie, 200);
    }catch(error){
        response.error(req,res, error, 400)
    }
})

module.exports = router;